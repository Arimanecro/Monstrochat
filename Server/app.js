require('dotenv').config({ path: './variables.env' });
const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const socketIds = {};
const onlineUsers = {};
const newFriends = {}

app.use([
    cors(),  
    fileUpload(),
    express.json()
  ]);

  io.on('connection', function(socket){ 
    
    socket.on('userID', (id, ids) => {
      let users = []; 
      console.log('userID', id);
      socketIds[socket.id] = id;
      onlineUsers[id] = socket.id;

       for (let [key, value] of Object.entries(onlineUsers)) {
         ids.includes(key) ? users.push(key) : null;
       }

      let u;
      u = newFriends[id] ? newFriends[id]['friends'] : [];
        
      io.to(socket.id).emit('checkOnlineFriends', users.concat(...u))

        ids.concat(...u).forEach( v => {
          if(onlineUsers[v]) {
            io.to(onlineUsers[v]).emit('whoIsOnline', socketIds[socket.id]);
          }
        })
    
    socket.on('newfriend', (uid) => {
        newFriends[uid] = {friends:[]}
        newFriends[uid]['friends'] = new Set();
        newFriends[uid]['friends'].add(id);
        ids.concat([uid]);
        if(onlineUsers[uid]) {
        io.to(socket.id).emit('checkOnlineFriends', users.concat([uid]));
      }
    })

    socket.on('disconnect', () => {
      console.log('disconnect ', socket.id)
      const id = socketIds[socket.id];
      newFriends[id] ? ids = ids.concat(...newFriends[id]['friends']) : null;
      ids.forEach( v => {
        if(onlineUsers[v]) {
          io.to(onlineUsers[v]).emit('checkOfflineFriends', socketIds[socket.id]);
        } 
      })
      delete socketIds[socket.id];
      delete onlineUsers[id];
      delete newFriends[id];
      ids=null;
      users=[];
    });
    })

    socket.on('msg', (wsID) => {
      const id = onlineUsers[wsID.receiverID];
      id ? io.to(id).emit('private', wsID.profile, wsID.msg) : socket.emit('offline', wsID.receiverID, wsID.profile, wsID.msg);
    });

  });

  app.get('/upload/:avatar', (req, res) => {
    if(req.params.avatar !== "dracula.svg") {
      res.sendFile(`${__dirname}/upload/${req.params.avatar}`);
    }
  })

  app.post('/user',(req, res) => {
      if(req.body.filename !== "dracula.svg") {
        fs.writeFile(`${__dirname}/upload/${req.body.filename}`, req.body.file, {encoding: 'base64'}, (err) => {
        if (err) { 
          res.status(500). json({success: false, msg: `The avatar could not be loaded. Error: ${err}`})}
        else {
          res.status(201).json({success: true}); 
        }
      });
      }
      else {
        res.status(201).json({success: true});
      }
  });

http.listen(process.env.PORT, () => console.log(`Server started...on ${process.env.PORT}`));

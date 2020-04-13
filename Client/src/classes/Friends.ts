/* eslint-disable no-var */
import {FriendCount, UserProfile, ChatProfile} from '../interfaces';
import {CNX as firebaseDB, checkEmailReturnData} from '../classes/firebase';
import {WS} from '../classes/Auth';
const fs = window.require('fs');
const readline = window.require('readline');
const os = window.require('os');

export default class Friends {

    static offlineMsg = {};

    static count():number {
        if(localStorage.getItem('profile')) {
            const {friends}:FriendCount = JSON.parse(localStorage.getItem('profile'));
            return Object.keys(friends).length;   
        }
        else {
            return 0;
        }
         
    }

    static checkEmailReturnData(name: string): Promise<{}> {
        return firebaseDB
            .collection('users')
            .where('displayName', '==', name)
            .get()
            .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
                if (!querySnapshot.empty) {
                    const data = {};
                    querySnapshot.forEach(doc => {
                        data[doc.id] = { ...doc.data() as UserProfile}
                    });
                    return Promise.resolve(data);
                } else {
                    return Promise.reject(false);
                }
            })
            .catch((err:string) => {
                console.error(err);
                return Promise.reject(false);
            });
    }

    static addFriend(friend:string): Promise<{}> {
        try {
          return Friends.checkEmailReturnData(friend);  
        }
        catch{ return Promise.reject("FB_Error"); }     
    }

    static topmostUser = (obj, user):void => {
        const a = Array.from(user.friends);
        if(a.length > 0 ) {
        Object.keys(obj).forEach((v,k) => {
            a.some((v1,k1) => {
                    if(v1[v]){ user.friends.splice( k1, 1 ); user.friends.unshift(obj);return true; }
                    else if(k1 == (a.length-1)) {user.friends.unshift(obj);return true;}
    })})}
    else { user.friends.unshift(obj)}
    }

    static getUserData(id):ChatProfile {
        let profile = {} as ChatProfile
        const {friends} = JSON.parse(localStorage.getItem('profile'));
        for (const [k,v] of Object.entries(friends)) {
            if(Object.keys(v).includes(id)) { profile = JSON.parse(friends[k][id]); break;} 
          }
        return profile;
    }

    static addMsg(id, msg, person, time){
        
        !fs.existsSync('./chats') && fs.mkdirSync('./chats');
        
        !fs.existsSync(`./chats/${id}.txt`) &&  fs.appendFile(`./chats/${id}.txt`,'', ()=>{});
        
        const data = fs.readFileSync(`./chats/${id}.txt`); //read existing contents into data
        const fd = fs.openSync(`./chats/${id}.txt`, 'w+');
        const buffer = Buffer.from(`${person}>>${time}>>${msg}${os.EOL}`);

        fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
        fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
        fs.close(fd, () => {});
    
}
    
    static addMsgWithSocket(id, message) {
        const [user, time, msg] = message.split('>>'); 
        const divMessages = document.querySelector(`#chat_${id} #messages`) as HTMLDivElement;
        if(divMessages) {
            const div = document.createElement("div");
            const t = document.createElement("div");
            const timeformat = document.createTextNode(time);
            div.classList.add("yellowBubble");
            t.classList.add("time");
            t.appendChild(timeformat);
            div.appendChild(t);
            div.innerHTML+=msg;
            divMessages.appendChild(div);
            divMessages.scrollTo({
                top: (divMessages.lastChild as HTMLDivElement).offsetTop,
                behavior: 'smooth'
              });
            Friends.addMsg(id,msg,1,time);
        }
        else {
            Friends.addMsg(id,msg,1,time);
        }
        
    }

    static openChatDialogs(id){
        const el = (document.getElementById(id)as HTMLElement);
        if(el && el.dataset.open == '0') {
            (el.children[3]as HTMLElement).style.display="block";
        }
        else if(!el) {
            setTimeout( () => {
                const el = (document.getElementById(id)as HTMLElement);
                (el.children[3]as HTMLElement).style.display="block";
            })
        }
    }

    static detectFirstNewMsgFromNewUser(id){
        const el = (document.getElementById(id) as HTMLElement);
        if(!el){
            const div = document.createElement("div");
            div.innerHTML=``;
            const list = document.getElementById("listOnline");
            list.insertBefore(div, list.firstChild);

        }
    }

    static sendMsg(receiverID, profile, msg, time) {
        msg = `1>>${time}>>${msg}${os.EOL}`
        WS.socket.emit('msg',  {receiverID, profile, msg})
    } 

    static readMsg(id, done, countMsg, retr, len) {

    if(fs.existsSync(`./chats/${id}.txt`)) {
       let count = 0;
       let arr = [];
       let load = false;
       const ret = retr;

       const rl = readline.createInterface({
            input: fs.createReadStream(`./chats/${id}.txt`,
                    { 
                        encoding: 'utf8',
                        crlfDelay: Infinity, 
                        emitClose: true,
                        highWaterMark: 5
                    }),
          });
          
        rl.on('line',  line => {
           count++;
           if(line) {
             arr.unshift(line);
           }

          if(count == countMsg) {
            rl.pause();
          }

        });

        rl.on('pause',  () => {
            if(!load){
                count = 0;
                done({msg:arr, resume: rl.resume.bind(rl)});
                arr=[];
                load = true;    
            }
            else {
                len.msg = arr.reverse();
                arr=[];
                count = 0;
                ret();
            }
            });
    }

    }

    static getOfflineMsg(message:string):void{
        for (const [key, value] of Object.entries(message)) {
            Friends.offlineMsg[key] = true;
            (value as any).forEach(v => {
            const [user, time, msg] = v.split('>>');
            Friends.addMsg(key, msg.replace(os.EOL, ''), "1", time); 
            });
          }
    }
}
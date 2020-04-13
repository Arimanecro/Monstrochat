import *  as firebase from 'firebase';
import "firebase/firestore";
import "firebase/app";
import "firebase/database";
import {ChatContext} from '../state/chatContext';
import { Context } from 'vm';
import { Html5Entities} from 'html-entities';
import {Auth as FirebaseAuth, checkHashedEmail } from './firebase';
import {UserProfile} from '../interfaces';
import Password from '../classes/validation/password';
import {IndexedDB} from '../classes/indexedDB';
import Friends from './Friends';

export default class Authorization  {
    
    static socket;

    static verification() {
        try {
            if(localStorage.getItem('profile')){
            const user = JSON.parse(localStorage.getItem('profile'));
            if(user.email) {
                checkHashedEmail(user.email).then(res => {
                    if(res) {
                        document.getElementById('WrapperBtns').remove();
                        document.getElementById('reg').remove();
                        document.getElementById('auth').remove();
                        document.getElementById('listofmonsters').remove();
                        document.getElementById('SpinnerLoading').setAttribute("style", "margin-left: -300px;");  
                        res?.offline && Object.keys(res.offline).length > 0 && Friends.getOfflineMsg(res.offline);
                        Authorization.socket.emit('userID', user.uid, Authorization.listFriendsIds());
                    }
                    else {
                        document.getElementById('SpinnerLoading').setAttribute("style", "margin-left: -300px;");
                        IndexedDB.delete("firebaseLocalStorageDb");
                    }
                })
            }
            else {
                document.getElementById('SpinnerLoading').setAttribute("style", "margin-left: -300px;");
                IndexedDB.delete("firebaseLocalStorageDb");
            }
        }
        else {
            document.getElementById('SpinnerLoading').setAttribute("style", "margin-left: -300px;");
        }
    }
    catch (e) { console.error(e); } 
    } 
    
    static go(setStatus:Function,email:string, password:string) {
        const entities = new Html5Entities();
        email = entities.encode(email);
        password = entities.encode(password);
        
        FirebaseAuth(email).then( (match) =>  Password.check(match as [UserProfile, string], email, password) )
                           .then(res => res ? Authorization.createAuthUser(res) : Authorization.cancelAuthorization(setStatus, "signin"))
                           .catch(e => Authorization.cancelAuthorization(setStatus, "signin"))
                                                    
    }

    static viaProvider(setStatus:Function, prov:string):Promise<void | firebase.auth.UserCredential> {
        try {
            const provider = new firebase.auth[prov]();
             return firebase.auth().signInWithPopup(provider).then((userdata:firebase.auth.UserCredential) => {
              const {email} = userdata?.user?.providerData[0] as any;
              FirebaseAuth(email).then( (match) =>  Password.check(match as [UserProfile, string], email) )
                               .then(res => res ? Authorization.createAuthUser(res) : Authorization.cancelAuthorization(setStatus, "signin"))
                               .catch(e => {console.error(e); Authorization.cancelAuthorization(setStatus, "signin")})                             
                                  
          }).catch(err => {
            console.error(err);
            setStatus({data:{}, spinner: false, errors: {"AuthError": true}});
          });
          }
          catch (err) { 
              console.error(err);
              setStatus({data:{}, spinner: false, errors: {"AuthError": true}});
           };
    }

    static cancelAuthorization = (setStatus:Function, status:string) => { 
            (document.getElementById("backtostart") as HTMLButtonElement).disabled = false;
            (document.getElementById("btnreg") as HTMLButtonElement).disabled = false;
            setStatus({data:{}, spinner: false, errors: {[status]: true}})        
    }

    static continueAuthorization = (setStatus:Function, email:string, password?:string) => {
        
        const data = new FormData();

        data.append('email', email);
        data.append('password', password);

        try {
            return fetch('http://localhost:8000/auth', {
                method: 'POST',
                body: data 
            })
            .then(response => response.json())
            .then(res => Promise.resolve(res));
        }
        catch (e) {
          console.error(e);
          Authorization.cancelAuthorization(setStatus, "server");
          };

    }

    static createAuthUser(user) {
        const {uid, monster, avatar, displayName, hashemail, friends, provider} = user;
        const f = [];
        Object.keys(friends).forEach(v => f.push( {[v]:friends[v]} ))
        localStorage.setItem('profile', JSON.stringify({uid, monster, avatar, displayName, friends:f, email: hashemail, provider }));
        (ChatContext as Context)._currentValue.rerenderList(props => !props);
        document.getElementById('reg').remove();
        document.getElementById('listofmonsters').remove();
        document.getElementById('WrapperBtns').setAttribute("style", "margin-left: -600px;");
        (document.getElementById("backtostart") as HTMLButtonElement).disabled = false;
        (document.getElementById("btnreg") as HTMLButtonElement).disabled = false;
        user?.offline && Object.keys(user.offline).length > 0 && Friends.getOfflineMsg(user.offline);
        Authorization.socket.emit('userID', uid, Authorization.listFriendsIds());
        provider && IndexedDB.delete("firebaseLocalStorageDb");
    }

    static listFriendsIds():string[] {
        const ids = []
        const f = JSON.parse(localStorage.getItem('profile'));
        f.friends.forEach( v => ids.push(Object.keys(v)[0]) );
        return  ids.length > 0 ? ids : [];
    }

} 

export const WS = Authorization;
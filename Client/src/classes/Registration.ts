import {Reg as FirebaseDBReg} from './firebase/firebase';
import {UserErrorContext} from '../state/userErrorContext';
import { Html5Entities} from 'html-entities';
import Password from '../classes/validation/password';
import { Context } from 'vm';
import {WS} from '../classes/Auth';

export default class Registration  {

    private setState:React.Dispatch<any>;

    constructor(setState){
        this.setState = setState;
    }

    private uuidv4 = () => {
        return (''+[1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g, (ch):string => {
            const c = Number(ch);
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
          })
      }
    
    private cancelRegistration = () => {
            (document.getElementById("back") as HTMLButtonElement).disabled = false;
            (UserErrorContext as Context)._currentValue.setError({data:{}, spinner: false, errors: {"FB_Error": true}})
            document.getElementById('WrapperBtns').setAttribute("style", "margin-left: -300px;");
            this.setState(null); 
        
    }

    public sendProfile = async () => {
    (document.getElementById("back") as HTMLButtonElement).disabled = true
    this.setState(true);
    
    // Sanitize inputs
    const profile = JSON.parse(localStorage.getItem('profile'))
    const userProfile = {}
    const entities = new Html5Entities();
    Object.entries(profile).map(([k, v]):void => { 
    userProfile[k] = v;
    entities.encode(v.toString()); 
});
    
    const data = new FormData();
    let nameFile = "dracula.svg";
    const friends = []; 

    try {

    if(userProfile['avatar'] !== "dracula.svg"){
        const mime = userProfile['avatar'].split(";")[0].split(":")[1];
        const format = mime.split("/")[1];
        nameFile = `${this.uuidv4()}.${format}`;
        const av = userProfile['avatar'].replace(/^data:image\/\w+;base64,/, ''); 
        
        // Data on resized avatar
    
        data.append('file', av);
        data.append('filename', nameFile);

        fetch('http://localhost:8000/user', {
            method: 'POST',
            body: data 
        })
        .then(response => response.json())
        .then(res => {
            if(!res.success){ 
                this.cancelRegistration();
            }  
            else {
                const hashemail = Password.encrypt(userProfile['email'])
                FirebaseDBReg({...profile, hashemail, password: Password.encrypt(userProfile['password']), avatar: nameFile}).then(id =>{
                    document.getElementById('WrapperBtns').setAttribute("style", "margin-left: -900px;");
                    const {monster, displayName} = JSON.parse(localStorage.getItem('profile'));
                    localStorage.setItem('profile', JSON.stringify({monster, displayName, uid:id, avatar:nameFile, email:hashemail, friends, time: Date.now() }));
                    console.log('1', JSON.parse(localStorage.getItem('profile'))['uid'])
                    WS.socket.emit('userID', JSON.parse(localStorage.getItem('profile'))['uid'], WS.listFriendsIds());
                }).catch( (e) => this.cancelRegistration() )  
            } 
        }).catch((e) => this.cancelRegistration()); 
    }
    else { 
        const hashemail = Password.encrypt(userProfile['email']);
        const password = Password.encrypt(userProfile['password']);

        FirebaseDBReg({...profile, hashemail, password, avatar: nameFile}).then(id =>{
            document.getElementById('WrapperBtns').setAttribute("style", "margin-left: -900px;");
            const {monster, displayName, avatar} = JSON.parse(localStorage.getItem('profile'));
            localStorage.setItem('profile', JSON.stringify({monster, displayName, avatar, uid:id, email:hashemail, friends, time: Date.now() }));
            console.log('2', JSON.parse(localStorage.getItem('profile'))['uid']);
            WS.socket.emit('userID', JSON.parse(localStorage.getItem('profile'))['uid'], WS.listFriendsIds());
        }).catch( (e) => console.log(e) )
    }
    }
     catch (e) {
        console.error(e); 
       };
}
}
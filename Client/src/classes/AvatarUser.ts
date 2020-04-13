import {UserProfile, UserAvatar} from '../interfaces';

export default class Avatar implements UserAvatar {

    private image: string | File;

    constructor(av) {
        this.image = av;
    }

    resize(){
        const mime = (this.image as string).split(";")[0] .split(":")[1];
        const format = mime.split("/")[1];
        const nameFile = `${this.randomName()}.${format}`;
        this.image =  new File([this.image], nameFile, {type: mime });
        return this;
    };

   randomName(){
        return (''+[1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (ch):string => {
            const c = Number(ch);
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
          })
      }

    sendToServer(userProfile:UserProfile){
        const data = new FormData();
        Object.entries(userProfile).map(([k, v]) => {
            if(k === 'avatar') {
                data.append(k, this.image);  
            }
            else {
               data.append(k, v); 
            }
            
        });
        fetch('http://localhost:8000/user', {
            method: 'POST',
            body: data
        });
    };
}

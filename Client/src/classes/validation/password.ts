/* eslint-disable prefer-const */
import {UserProfile} from '../../interfaces';
import {updateHashEmail} from '../../classes/firebase';

const crypto = window.require('crypto');
const Buffer = window.require('buffer').Buffer;

export default class Password {

    static ENCRYPTION_KEY = "prMub4Y77v8MAyWaTv9SL2vC8qsMpKep";
    static IV_LENGTH = 16;

    static check(user:[UserProfile, string], email:string, password:string | boolean = false):boolean | UserProfile{
            const [data, id] = user;
            const hash = Password.encrypt(email);
            if(!data.provider) {
                const decPassword = Password.decrypt(data.password);
                if (data.email === email && decPassword === password) {
                    updateHashEmail(hash, id);
                    return {...data, uid:id, hashemail:hash};
            } 
            else { return false; }  
            }
            else {
                updateHashEmail(hash, id);
                return {...data, uid:id, hashemail:hash};
            }
    }

    static encrypt(text) {
        let iv = crypto.randomBytes(Password.IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer.from(Password.ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);
    
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }
    
    static decrypt(text) {
        let textParts = text.split(':');
        let iv = new Buffer.from(textParts.shift(), 'hex');
        let encryptedText = new Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer.from(Password.ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}
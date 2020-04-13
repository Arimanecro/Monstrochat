/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import firebase from 'firebase/app';
import { UserErrorContext } from '../../state/userErrorContext';
import {ChatContext} from '../../state/chatContext';
import { Context } from 'vm';
import { AddDbError } from '../Errors';
import { IndexedDB } from '../indexedDB';
import {FieldCheckEmail, UserProfile} from '../../interfaces';
import Password from '../../classes/validation/password';
import Friends from '../Friends';
import {WS} from '../../classes/Auth';

const config = {
    apiKey: 'AIzaSyBWtqVGkOOj_QjsRGcjPmiLWEBHwMzSpjo',
    authDomain: 'monstrochat.firebaseapp.com',
    databaseURL: 'https://monstrochat.firebaseio.com',
    projectId: 'monstrochat',
    storageBucket: 'monstrochat.appspot.com',
    messagingSenderId: '46704450605',
    appId: '1:46704450605:web:ba312cb1b9fbbdf0196ca4',
};

firebase.initializeApp(config);

const firebaseDB = firebase.firestore();

class Firebase {

    static auth(email: string): Promise<firebase.firestore.DocumentData | boolean> {
        return firebaseDB
            .collection('users')
            .where('email', '==', email)
            .limit(1)
            .get()
            .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
                if (!querySnapshot.empty) {
                    return Promise.resolve([querySnapshot.docs[0].data(), querySnapshot.docs[0]['id']]);
                } else {
                    return Promise.reject(false);
                }
            });
    }

    static newUserSocialMedia(prov): Promise<void | firebase.auth.UserCredential> {
        try {
            const provider = new firebase.auth[prov]();
            return firebase
                .auth()
                .signInWithPopup(provider)
                .then((user: firebase.auth.UserCredential) => {
                    const { email, displayName, uid } = user && (user.user.providerData[0] as any);
                    if (!email) return Firebase.cancelSocialMediaRegistration('AuthError');
                    Firebase.regWithAuthOfProvider(uid, email, displayName.toLowerCase(), true);
                })
                .catch((err:string) => { return Firebase.cancelSocialMediaRegistration('AuthError');});
        } 
        catch { (err:string) => { return Firebase.cancelSocialMediaRegistration('AuthError'); };
        }
    }

    static googleAuth(): Promise<void | firebase.auth.UserCredential> {
        return Firebase.newUserSocialMedia('GoogleAuthProvider');
    }

    static facebookAuth(): Promise<void | firebase.auth.UserCredential> {
        return Firebase.newUserSocialMedia('FacebookAuthProvider');
    }

    static checkUserEmail(fields: FieldCheckEmail): Promise<boolean> {
        return firebaseDB
            .collection('users')
            .where('email', '==', `${fields.email}`)
            .limit(1)
            .get()
            .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
                if (!querySnapshot.empty) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((err:string) => {
                console.error(err);
                return false;
            });
    }

    static checkHashedEmail(email: string):any {
        return firebaseDB
            .collection('users')
            .where('hashemail', '==', email)
            .limit(1)
            .get()
            .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
                if (!querySnapshot.empty) {  
                    let data;
                    querySnapshot.forEach(doc => { data = doc.data() });    
                    return data;
                } else {
                    return false;
                }
            })
            .catch((err:string) => {
                console.error(err);
                return false;
            });
    }

    static checkEmailReturnData(email: string): Promise<UserProfile> {
        return firebaseDB
            .collection('users')
            .where('email', '==', email)
            .limit(1)
            .get()
            .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
                if (!querySnapshot.empty) {
                    let data: UserProfile;
                    querySnapshot.forEach(doc => {
                        data = { ...(doc.data() as UserProfile) };
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

    static async reg(fields: UserProfile, provider = false): Promise<string> {
        const { email, hashemail, displayName, password, avatar, monster } = fields;
        const friends = {};
        return firebaseDB
            .collection('users')
            .add({ email, hashemail, displayName, password, avatar, monster, provider, friends })
            .then(ref => {
                return Promise.resolve(ref.id);
            })
            .catch((err:string)=> {
                throw new AddDbError(`Error adding new user: ${err}`);
            });
    }

    static cancelRegistration(email: string): Promise<void> {
        return firebaseDB
            .collection('users')
            .where('email', '==', `${email}`)
            .limit(1)
            .get()
            .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(doc => {
                        doc.ref
                            .delete()
                            .then(() => {
                                Promise.resolve(true);
                            })
                            .catch(function(err:string) {
                                Promise.reject('Error removing document: ' + err);
                                console.error('Error removing document: ', err);
                            });
                    });
                }
            })
            .catch((err:string) => {
                console.log(err);
            });
    }

    static cancelSocialMediaRegistration(status: string): void {
        document.getElementById('secondSpinner').style.display = 'none';
        (document.getElementById('backtoindex') as HTMLButtonElement).disabled = false;
        (document.getElementById('btnVerific') as HTMLButtonElement).disabled = false;
        (UserErrorContext as Context)._currentValue.setError({ data: {}, spinner: false, errors: { [status]: true } });
    }

    static async regWithAuthOfProvider(
        uid: string,
        email: string,
        displayName: string,
        provider = true,
    ): Promise<boolean | string> {
        
        let success: any;
        let hashedEmail: string;
        const friends = {};
        const freeEmail = await Firebase.checkUserEmail({ email });
        
        // eslint-disable-next-line prefer-const
        if(!freeEmail) {
            hashedEmail = Password.encrypt(email);
            firebaseDB
                .collection('users')
                .add({
                    uid,
                    email,
                    displayName,
                    provider,
                    hashemail: hashedEmail,
                    avatar: 'dracula.svg',
                    monster: '0',
                    friends
                } as UserProfile)
                .then(doc => {
                    localStorage.setItem(
                        'profile',
                        JSON.stringify({
                            uid:doc.id,
                            monster: '0',
                            displayName,
                            avatar: 'dracula.svg',
                            email: hashedEmail,
                            friends,
                            time: Date.now(),
                        }),
                    );
                    IndexedDB.delete('firebaseLocalStorageDb');
                    document.getElementById('auth').remove();
                    document.getElementById('listofmonsters').remove();
                    document.getElementById('WrapperBtns').setAttribute('style', 'margin-left: -600px;');
                    return true;
                }).catch(e => { console.log(1, e); Firebase.cancelSocialMediaRegistration('FB_Error')})
        }
        else {
            Firebase.cancelSocialMediaRegistration('exists');
            return success;
        }
    }

    static async updateHashEmail(hash:string, id:string):Promise<void> {
        const DB = await firebaseDB.collection('users');
        return DB.doc(id).update({ hashemail: hash}).catch((err:string) => { console.error(err) });
    }

    static updateListOfFriends(fbId, id, userProf, fn) {
        const{displayName, avatar, monster} = userProf;
        fn ? fn(false) : null;
        const user = JSON.parse(localStorage.getItem('profile'));
        Friends.topmostUser({[id]: JSON.stringify({displayName, avatar, monster})}, user);
        localStorage.setItem('profile', JSON.stringify({...user })); 
        
        firebaseDB.collection('users').doc(fbId).set(
            {friends: { [id]: JSON.stringify({displayName, avatar, monster}) }
        },{ merge: true }).then( () => {  
            (ChatContext as Context)._currentValue.rerenderList(props => !props);
            fn ? fn(true) : null;
            setTimeout(() => WS.socket.emit('newfriend', id))
                       
        });        
    }

    static updateOfflineMsg(id, profile, msg) {
        
      const {uid, displayName, avatar, monster} = profile;
      firebaseDB.collection('users').doc(id).set(
          { 
            offline: { [uid]: firebase.firestore.FieldValue.arrayUnion(msg)},
            friends: { [uid]: JSON.stringify({displayName, avatar, monster}) }
          },
          { merge: true });  
    }

    static deleteOfflineMsg(id, idMsg) {
        firebaseDB.collection('users').doc(id).update(
            { 
                ['offline.' + idMsg]: firebase.firestore.FieldValue.delete()
            });
    }

    static async deleteFromListOfFriends(fbId, id, fn) {
        fn(false);
        const profile = JSON.parse(localStorage.getItem('profile'));
        let key;
        profile.friends.forEach((v,k) => { if(profile.friends[k][id]) key = k  })
        profile.friends.splice( key, 1 )
        localStorage.setItem('profile', JSON.stringify(profile));
        firebaseDB.collection('users').doc(fbId).update({
            [`friends.${id}`]: firebase.firestore.FieldValue.delete()
        }).then(() => {
            (ChatContext as Context)._currentValue.rerenderList(props => !props);
            fn(null);
        });  
    }
}

export const Auth = Firebase.auth;
export const Reg = Firebase.reg;
export const googleAuth = Firebase.googleAuth;
export const facebookAuth = Firebase.facebookAuth;
export const regWithAuthOfProvider = Firebase.regWithAuthOfProvider;
export const checkUserEmail = Firebase.checkUserEmail;
export const checkHashedEmail = Firebase.checkHashedEmail;
export const checkEmailReturnData = Firebase.checkEmailReturnData;
export const cancelFirebaseRegistration = Firebase.cancelRegistration;
export const updateHashEmail = Firebase.updateHashEmail;
export const updateListOfFriends = Firebase.updateListOfFriends;
export const deleteOfflineMsg = Firebase.deleteOfflineMsg;
export const updateOfflineMsg = Firebase.updateOfflineMsg;
export const deleteFromListOfFriends = Firebase.deleteFromListOfFriends;
export const CNX = firebaseDB;
export default firebase;

//https://firebase.google.com/docs/firestore/manage-data/add-data
export interface UserProfile {   
    email: string;
    hashemail?: string;
    uid?:string,
    fbId?:string,
    provider?:boolean,
    password?: string,
    offline?: string[],
    displayName: string;
    avatar: string;
    monster: string;
    setCurrentProfile?: () => void;  
}

export interface ChatProfile {
    avatar: string;
    monster: string;
    displayName?:string;
}

export interface FormFields {
    email?:string,
    password?:string
    login?:string,
    search?:string,
    signin?:string,
    exists?:string,
    database?:string,
    avatar?:string,
    server?:string
}

export interface EncryptFields {
    iv:string,
    encryptedData: string,
    key:string
}

export interface FieldCheckEmail {
    email: string;
}

export interface FieldsAuth extends FieldCheckEmail {
    password: string;
}

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export interface ErrorProps {
    error:{};
}

export interface UserAvatar{
    resize(img:string):this;
    randomName():string;
    sendToServer(userProfile:UserProfile);
}

export interface CRUD {
    create (email:string);
    read (email:string);
    update?: (email:string) => void;
    delete (nameDB: string);
}

export interface RegProps
{
    FirebaseDbCheckUserEmail:(fields: FieldsAuth) => Promise<boolean>, 
    googleAuth: () => Promise<void | firebase.auth.UserCredential>, 
    facebookAuth: () => Promise<void | firebase.auth.UserCredential>
}

export interface ReactProps  {
    children?: React.ReactNode,
    user?:UserProfile[],
    id?:string[]
    render?:Function
}

export interface Chat {
    children?: React.ReactNode,
    uid: string,
    active: string
}

export interface UserError {
    setError:React.Dispatch<React.SetStateAction<{
        errors: any;
        data: {};
        spinner: boolean;
    }>>
}

export interface SearchState {
    data: boolean | {}, 
    loading:boolean, 
    error:object
}

export interface FriendCount {
    friends: [string];
}

export interface ChatState {
    chats:string[], 
    active: string
}
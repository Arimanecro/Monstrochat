import React, { ReactElement } from 'react';
import {UserErrorContext} from '../../state/userErrorContext';
import { Context } from 'vm';
import Resizer from 'react-image-file-resizer';
import {FormFields, HTMLInputEvent, ErrorProps} from '../../interfaces';

export default class Validator {
 
    static bg;

    static checkerError(data):FormFields {
        
        const errors:FormFields = {};

        Object.keys(data).forEach(key=>{
            switch (key) {
                case "displayName":
                    errors.login = "Must be at least 4 and max 25 characters";
                    break;
                case "search":
                    errors.search = "Must be at least 4 and max 25 characters";
                    break;
                case "password":
                  errors.password = "Must be at least 8 and max 35 characters";
                  break;
                case "email":
                    errors.email = "Incorrect Email"; 
                    break;
                case "exists":
                    errors.exists = "This email address has already been registered"; 
                    break;
                case "unexists":
                    errors.exists = "This email address doesn't exist"; 
                    break;
                case "userunexists":
                    errors.exists = "User doesn't exist"; 
                    break;
                case "signin":
                    errors.signin = "Incorrect Email or Password"; 
                    break;
                case "FB_Error":
                    errors.database = "Something went wrong on the server"; 
                    break;
                case "AuthError":
                    errors.database = "Authorization error, please try again"; 
                    break;
                case "avatar":
                    errors.avatar = "Avatar not loaded :("; 
                    break;
                case "unsupported":
                    errors.avatar = "Unsupported format. Only JPG/JPEG/PNG/WEBP"; 
                    break;
                case "server":
                    errors.server = "Server is not responding"; 
                    break;
              }  
         });

         return errors;
    }
    
    static imageHandler(event:HTMLInputEvent, callback){
            if(event.target.files[0]) {
                Resizer.imageFileResizer(
                    event.target.files[0],
                    48,
                    48,
                    event.target.files[0].type.split('/')[1].toUpperCase(),
                    100,
                    0,
                    uri => callback(uri),
                    'base64'
                );
            }    
    }

    static withoutKeys(typeError:string):boolean{
        const allowed = ["signin", "exists","avatar", "database", "server", "search"];
        return allowed.includes(typeError);
    }

    static allowedExtensions(ext:string):boolean | void{
        const allowed = ["jpg", "jpeg","png"];
        return allowed.includes(ext) ? true : (UserErrorContext as Context)._currentValue.setError({data:{}, spinner: false, errors: {"unsupported": true}});
    }

    static toLowerCase(obj:object, fields:string[] = []):object{
        Object.entries(obj).map(([k, v]) => { return fields.includes(k) ? obj[k] = v.toLowerCase().trim() : null;});
        return obj;
    }
}

export const СheckerError:React.FC<ErrorProps> = (props:ErrorProps): ReactElement => {
    const errors:FormFields = Validator.checkerError(props.error); 
    return(
    <>
    {Object.entries(errors).map(([k, v]) => { 
        return (!Validator.withoutKeys(k)) 
            ? 
            <p key={k} style={ { margin: '11px 0 0 0', color:'#e5332a', fontSize: '14px', letterSpacing: '1px'} }><span style={ {textDecoration: 'underline'} }>- {k}: </span>{v}</p> 
            : 
            <p key={k} style={ { margin: '11px 0 0 0', color:'#e5332a', fontSize: '14px', letterSpacing: '1px'} }>{v}</p> 
    })}
            </>);
}

export const imageHandler = (e, callback) => Validator.imageHandler(e, callback);

export const toLowerCase = Validator.toLowerCase;
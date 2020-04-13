/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prefer-const */

import React, { ReactElement, useState, useEffect} from 'react';
import {UserErrorContext} from '../../state/userErrorContext';
import { Context } from 'vm';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import {FieldsAuth, RegProps} from '../../interfaces';
import Spinner from '../UI/spinner';
import {СheckerError, toLowerCase} from '../../classes/validation/validator';
import Img from './avatar';
import BgReg from '../../../public/img/bgReg.png';
import Fb from '../../../public/img/fb.svg';
import G from '../../../public/img/google.svg';
import Back from '../../../public/img/btn_back.png';

const InputImg = React.memo(Img);

const WrapperForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    min-height: 328px;
    height: auto;
    padding-top: 32px;
    padding-bottom: 20px;
    background: linear-gradient(
        rgba(0, 0, 0, 0.8), 
        rgba(0, 0, 0, 0.8)
      ), url(${BgReg}) no-repeat;
    background-position-y: bottom; 
    font-family: 'Conv_mouth_breather';
    font-size: 72px;
    text-align:center;
    line-height: 22px;
    color: #f47b5b;
    position: relative;
    z-index: 2;
`;

const Input = React.memo(styled.input`
    border-width: 2px;
    border-radius: 16.5px;
    border-color: rgb(147, 192, 31);
    border-style: solid;
    background-color: rgba(18, 17, 16, 0.671);
    width: 233px;
    height: 29px;
    margin-bottom: 8px;
    outline: none;
    font-family: 'Conv_mouth_breather';
    font-size: 16px;
    color: #851fc0;
    text-align: center;

    &::placeholder {
        font-family: 'Conv_mouth_breather';
        font-size: 16px;
        color: #851fc0;
        text-align: center;
    }
`);

const BtnReg = React.memo(styled.button`    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 20px;
    margin-bottom: 39px;
    color: #fffa4a;
    background: transparent;
    font-family: 'Conv_from-cartoon-blocks';
    font-size: 48px;
    cursor: pointer;
    border:none;
    outline:none;
`);

const Via = React.memo(styled.span`
    color: white; 
    font-size: 16px;
    font-family: 'Conv_mouth_breather';
`);

const WrapperSocialMedia = React.memo(styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 72px;
    height: 26px;
    margin-top: 14px;
`);

const BtnSocialMedia = React.memo(styled.div`
    width: 28px;
    height: 32px;
    background: url(${ props => props.provider.includes('google') ? G : Fb });
    background-size: cover;
    cursor:pointer;
`);

const BtnBack = React.memo(styled.button`
    width: 22px;
    height: 22px;
    background: url(${Back}) no-repeat;
    background-size: cover;
    position: absolute;
    top: 5px;
    left: 0px;
    transform: rotate(90deg);
    cursor: pointer;
    border: none;
    outline: none;
`);

export const Reg:React.FC<RegProps> =  ({FirebaseDbCheckUserEmail, googleAuth, facebookAuth}:RegProps): ReactElement => {
        
    const [requestStatus, setStatus] = useState({errors:null, data: {}, spinner:false} );
       
    const disableBtns = ():void => {
        document.getElementById("secondSpinner").style.display="block";                  
        (document.getElementById("backtoindex") as HTMLButtonElement).disabled = true;
        (document.getElementById("btnVerific") as HTMLButtonElement).disabled = true;
    }

    const next = ():void => {  
        document.getElementById('WrapperBtns').setAttribute("style", "margin-left: -600px;"); 
        const profile = JSON.parse(localStorage.getItem('profile'))
        localStorage.setItem('profile', JSON.stringify({...profile, ...requestStatus['data'], monster:"0", avatar: (profile && profile.avatar) ? profile.avatar : "dracula.svg" }));
        setStatus({data:{}, spinner: false, errors:null });
    };

    useEffect(()=> {
        (UserErrorContext as Context)._currentValue.setError = setStatus;              
        if(requestStatus.spinner){ 
            FirebaseDbCheckUserEmail((requestStatus.data) as FieldsAuth ).then(res => { 
                return res ? 
                           setStatus({data:{}, spinner: false, errors: {"exists": true}}) 
                           :
                           next();
                }, (err) => {
                    setStatus({data:{}, spinner: false, errors: {"FB_Error": true}})
                    console.error(err)
                });
  
            };
        }, [requestStatus.spinner])

    let { register, handleSubmit, reset, errors } = useForm();

    const clear = ():void => {
        document.getElementById('WrapperBtns').setAttribute("style", "margin-left: 0px;");
        reset();
        localStorage.removeItem("profile"); 
        document.getElementById('av').setAttribute("style", `background: url('./img/dracula.svg') no-repeat;background-size:cover;background-position: center;`);
        setStatus({data:{}, spinner: false, errors:null });
    }

    const onSubmit = async (data) => {
        toLowerCase(data, ['email', 'password', 'displayName']);
        setStatus({errors:null, data, spinner: true });
    }
    
    return (
        <WrapperForm id="reg" onSubmit={ handleSubmit(onSubmit)} 
        encType="multipart/form-data">
        <BtnBack id="backtoindex" form="unex" onClick={ (e:Event)=>{
            e.preventDefault();
            clear();
             }}/>
        { requestStatus.spinner && <Spinner style={ {marginTop: "0px"} }/>}
        <Spinner id="secondSpinner" style={ {display: "none", marginTop: "0px"} }/> 
        { Object.keys(errors).length ? <СheckerError error={errors}/> 
                                        : (requestStatus.errors ? <СheckerError error={requestStatus.errors}/> : null) } 
            <Input id="displayName" style={{marginTop: '20px'}} name="displayName" type="text" placeholder="display name" ref={register({ required: true, maxLength: 25, minLength: 4 })} />
            <Input id="password" name="password" type="text" placeholder="password" ref={register({ required: true, maxLength: 35, minLength: 8 })} />
            <Input id="email" onChange={ () => requestStatus.errors=null} name="email" type="email" placeholder="email" ref={register({
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })} />
          <InputImg  />
            <BtnReg id="btnVerific" > &gt;&gt; </BtnReg>
            <Via>or via</Via>
            <WrapperSocialMedia>
            <BtnSocialMedia onClick={ () => { disableBtns(); facebookAuth(); }} provider="facebook" />
            <BtnSocialMedia onClick={ () => { disableBtns(); googleAuth(); }} provider="google" />
            </WrapperSocialMedia >     
        </WrapperForm>
    ) 
}
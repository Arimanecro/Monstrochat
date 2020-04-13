/* eslint-disable prefer-const */
/* eslint-disable react/no-unescaped-entities */

import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import {СheckerError, toLowerCase} from '../../classes/validation/validator';
import Authorization from '../../classes/Auth';
import {FieldsAuth} from '../../interfaces';
import Spinner from '../UI/spinner';
import BgReg from '../../../public/img/bgReg.png';
import Fb from '../../../public/img/fb.svg';
import G from '../../../public/img/google.svg';
import Back from '../../../public/img/btn_back.png';

const WrapperForm = styled.form`
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    min-height: 374px;
    height: auto;
    padding-top: 20px;
    padding-bottom: 20px;
    background: linear-gradient(
        rgba(0, 0, 0, 0.8), 
        rgba(0, 0, 0, 0.8)
      ), url(${BgReg}) no-repeat;
    background-position-y: bottom;  
    font-family: 'Conv_mouth_breather';
    font-size: 72px;
    text-align:center;
    color: #f47b5b;
    position: relative;
    z-index: 2;
    line-height: 22px;
    box-sizing: border-box;
`;

const Input = styled.input`
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
`;

const BtnReg = styled.button`    
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
`

const Via = styled.span`
    color: white; 
    font-size: 16px;
    font-family: 'Conv_mouth_breather';
`;

const WrapperSocialMedia = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 72px;
    height: 26px;
    margin-top: 14px;
`;

const BtnSocialMedia = styled.div`
    width: 28px;
    height: 32px;
    background: url(${ props => props.provider.includes('google') ? G : Fb });
    background-size: cover;
    cursor:pointer;
`;

const BtnBack = styled.button`
    width: 22px;
    height: 22px;
    border: none;
    outline:none;
    background: url(${Back}) no-repeat;
    background-size: cover;
    position: absolute;
    top: 5px;
    left: 0px;
    transform: rotate(90deg);
    cursor: pointer;
`;

export const Auth = (props) : ReactElement  => {
    
    let [requestStatus, setStatus] = useState({errors:null, data: {} as FieldsAuth, spinner:false});

    useEffect(()=> {
        if(requestStatus.spinner){
            (document.getElementById("backtostart") as HTMLButtonElement).disabled = true;
            (document.getElementById("btnreg") as HTMLButtonElement).disabled = true;
            Authorization.go(setStatus, requestStatus.data.email, requestStatus.data.password);
            };

        }, [requestStatus.spinner])

    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = async (data) => {
        toLowerCase(data, ['email', 'password', 'displayName']);
        setStatus(prevState => { return {...prevState, data, spinner: true }; });
    }

    return (
        <WrapperForm id="auth" onSubmit={handleSubmit(onSubmit)}>
        <BtnBack id="backtostart" form="unex" onClick={ (e:Event)=>{
            e.preventDefault();
            document.getElementById('WrapperBtns').setAttribute("style", "margin-left: 0px;");
            setStatus(prevState => { return {...prevState, errors: null, spinner: false }; });
            }}/>
           { requestStatus.spinner && <Spinner/>} 
           { Object.keys(errors).length ? <СheckerError error={errors}/> 
                                        : (requestStatus.errors ? <СheckerError error={requestStatus.errors}/> : null) }      
            
            <Input style={{marginTop: '20px'}} name="email" ref={register({
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })} type="email" placeholder="email"/>
            
            <Input name="password" ref={register({ required: true, maxLength: 25, minLength: 8 })} type="text" placeholder="password"/>
            <BtnReg id="btnreg"> &gt;&gt; </BtnReg>
            <Via>or via</Via>
            <WrapperSocialMedia>
                <BtnSocialMedia onClick={ () => Authorization.viaProvider(setStatus, "FacebookAuthProvider")} provider="facebook" />
                <BtnSocialMedia onClick={ () => Authorization.viaProvider(setStatus, "GoogleAuthProvider")} provider="google" />
            </WrapperSocialMedia >     
        </WrapperForm>
    ) 
}
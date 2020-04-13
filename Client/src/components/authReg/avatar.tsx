import React, { ReactElement} from 'react';
import styled from 'styled-components';
import Validator, {imageHandler} from '../../classes/validation/validator';
import BgAvatar from '../../../public/img/dracula.svg';

export default (props): ReactElement => {   

const WrapperInputImg = React.memo(styled.div`
    display: flex;
    align-items: center;
    width: 233px;
    height: 52px;
    position: relative;
    font-size: 16px;
    color: #851fc0;
`);

const InputImg = React.memo(styled.input`display:none;`);

const LabelInputImg = React.memo(styled.label`
    width: 48px;
    height: 48px;
    margin-right: 32px;
    border: rgb(147, 192, 31) 2px solid;
    border-radius: 50%;
    background: url(${props => {
        if(JSON.parse(localStorage.getItem('profile')) && JSON.parse(localStorage.getItem('profile'))['avatar'] !=="dracula.svg"){
            return JSON.parse(localStorage.getItem('profile'))['avatar'];
        }
        else {
            return BgAvatar;
        }
    }}) no-repeat;
    background-size: cover;
    background-position: center;
    cursor: pointer;
`);

return (
        <WrapperInputImg>  
        <LabelInputImg id="av">
            <InputImg onChange={async (e) => {
                e.preventDefault();
                const type = e.target.files[0].type.split('/')[1];
                const ext = e.target.files[0].name.split(".").slice(-1)[0].toLowerCase();
                if(Validator.allowedExtensions(ext) === true && Validator.allowedExtensions(type) === true){
                document.getElementById('av').setAttribute("style", `background: url(${URL.createObjectURL(e.target.files[0])}) no-repeat;background-size:cover;background-position: center;`);
                imageHandler(e, (resizedAv) => {
                    const profile = JSON.parse(localStorage.getItem('profile'))
                    localStorage.setItem('profile', JSON.stringify({...profile, avatar:resizedAv }));
                });
            }           
            }
                } name="avatar" id="avatar" type="file" />
        </LabelInputImg>
        <label htmlFor="avatar"><span style={{cursor:"pointer"}}>Avatar</span></label> 
    </WrapperInputImg>
    )
}
import React, { ReactElement, useRef } from 'react';
import {UserErrorContext} from '../../state/userErrorContext';
import styled from 'styled-components';
import SpinnerLoading from '../UI/spinnerPuff';
import {Reg} from './reg';
import {Auth} from './auth';
import Chat from '../chat';
import {ListOfMonsters} from '../UI/listOfMonsters';
import {checkUserEmail, googleAuth, facebookAuth} from '../../classes/firebase/firebase';

const R = React.memo(Reg);
const A = React.memo(Auth);
const L = React.memo(ListOfMonsters);
const C = React.memo(Chat);

const WrapperBtns = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    min-width: 300px;
    min-height: 374px;
    height: auto;
    background-color: rgba(0, 0, 0, 0.749);  
    font-family: 'Conv_mouth_breather';
    font-size: 72px;
    text-align:center;
    color: #f47b5b;
    transition: all ease .35s;
`;

const Btn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 237px;
    height: 35px;
    margin-bottom: 8px;
    background-color: ${ props => props.color === 'green' ? `rgba(50, 171, 147, 0.671)`: `rgb(50, 110, 171, 0.671)`} ;
    color:white;
    font-size:20px;
    text-align:center;
    letter-spacing: 1px;
    cursor:pointer;
`;

export default (): ReactElement => {
    
    const p = useRef(null);
    
    return (
        <>
    <SpinnerLoading />
        <WrapperBtns id="WrapperBtns" ref={p}>  
            <Btn color="green" onClick={()=>
                {
                  document.getElementById('reg').setAttribute("style", "display: none;");
                  document.getElementById('auth').setAttribute("style", "display: flex;");
                  document.getElementById('WrapperBtns').setAttribute("style", "margin-left: -300px;");
                }}>sign in</Btn>
            <Btn color="blue"  onClick={()=>
                {
                    document.getElementById('auth').setAttribute("style", "display: none;");
                    document.getElementById('reg').setAttribute("style", "display: flex;"); 
                    document.getElementById('WrapperBtns').setAttribute("style", "margin-left: -300px;");
                }}>register</Btn>
        </WrapperBtns>
        
        <UserErrorContext.Provider value={{setError:()=>{}}}>        
            <A />
            <R FirebaseDbCheckUserEmail={checkUserEmail} googleAuth={googleAuth} facebookAuth={facebookAuth}/>
            <L /> 
        </UserErrorContext.Provider>
        <C /> 
        </>
    );
}

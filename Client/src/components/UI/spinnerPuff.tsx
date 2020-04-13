import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import bgSpinner from '../../../public/img/spinner_puff.svg';
import Authorization from '../../classes/Auth';

const SpinnerLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 70px;
    background:url(${bgSpinner}) no-repeat;
    background-size: contain;
    background-position: top;
    color: white;
`;

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
    font-size: 18px;
    text-align:center;
    color: #f47b5b;
    transition: all ease .35s;
`;

export default (): ReactElement => {
    
    useEffect( () => Authorization.verification(), []);
    
    return (
    <WrapperBtns id="SpinnerLoading">
    <SpinnerLoading ><span>Loading...</span></SpinnerLoading>
    </WrapperBtns>
    )};
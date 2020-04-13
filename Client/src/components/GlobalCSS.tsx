import React, { ReactElement } from 'react';
import styled, { createGlobalStyle }  from 'styled-components';
import BgWelcome from '../../public/img/bgWelcome.jpg';
import {ReactProps} from '../interfaces';

const Body = createGlobalStyle`
    body { margin: 0px; padding:0px;}
`;

const Shell = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width:300px;
    height: 636px;
    background: url(${BgWelcome}) center no-repeat; 
    background-color: #4c6260;
    background-size: contain;
    position: relative;
    overflow: hidden;
`

export const GlobalCSS:React.FC<ReactProps> = (props:ReactProps): ReactElement => {
    return (
    <>
    <Body />
    <Shell>{props.children}</Shell>
    </>
    );
} 


import React, { ReactElement } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AndyFont from '../../../public/wf/comic_andy.woff';
import MouthBreatherFont from '../../../public/wf/mouth-breather-bb.regular.woff';
import RegBtnFont from '../../../public/wf/from-cartoon-blocks.regular.woff';
import OnlineOfflineFont from '../../../public/wf/JosefinSlab-Bold.woff';
import CaviarDreamsFont from '../../../public/wf/Caviar_Dreams_Bold.woff';
import Nunito from '../../../public/wf/Nunito-Regular.woff';

import BtnsRegSignIn from './btnRegSignIn';

const WebFonts = createGlobalStyle`

@font-face {
	font-family: 'Nunito';
	src: url(${Nunito}) format('woff');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: 'Conv_JosefinSlab-Bold';
	src: url(${OnlineOfflineFont}) format('woff');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: 'Conv_comic_andy';
	src: url(${AndyFont}) format('woff');
	font-weight: normal;
	font-style: normal;
}
@font-face {
	font-family: 'Conv_mouth_breather';
	src: url(${MouthBreatherFont}) format('woff');
	font-weight: normal;
	font-style: normal;
}
@font-face {
	font-family: 'Conv_from-cartoon-blocks';
	src: url(${RegBtnFont}) format('woff');
	font-weight: normal;
	font-style: normal;
}
@font-face {
	font-family: 'Conv_Caviar_Dreams_Bold';
	src: url(${CaviarDreamsFont}) format('woff');
	font-weight: normal;
	font-style: normal;
}
`;

const WrapperLogo = styled.div`
    align-items: flex-start;
    width: 100%;
    height: 200px;
    margin-top: 16px;
    text-align: center;
    line-height: 28px;
    position: absolute;
    top:0px;
`;
const Logo = styled.span`
    font-family: 'Conv_comic_andy';
    font-size: 72px;
    text-align:center;
    letter-spacing: 4px;
    color: #f47b5b;
`;

const WrapperBlocks = styled.div`
    display: flex;
    align-items: center;
    width: 900px;
    min-height: 328px;
    height: auto;
`

export default (): ReactElement => {
    return (
    <>   
    <WebFonts/>
    <WrapperLogo>
        <Logo>MONSTRO</Logo>
        <br/>
        <Logo>CHAT</Logo>   
    </WrapperLogo>
    <WrapperBlocks>
    <BtnsRegSignIn />
    </WrapperBlocks>
    </> 
    );
};
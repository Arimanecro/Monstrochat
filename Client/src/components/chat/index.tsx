/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import {WS} from '../../classes/Auth';

import {updateListOfFriends, updateOfflineMsg, deleteOfflineMsg} from '../../classes/firebase';
import Friends from '../../classes/Friends';

import io from 'socket.io-client';
import {ListOfFriends} from '../UI/listOfFriends';
import FactoryOfViews from '../chat/factoryOfViews';
import SearchPanel from './search';
import {ChatBlockObserver} from '../../classes/Observer';
import bg from '../../../public/img/friends.jpg';
import addBg from '../../../public/img/add_friends.svg';
import settings from '../../../public/img/settings_ico.png';
import search from '../../../public/img/search.svg';
WS.socket = io('http://localhost:8000');

const Wrapper = styled.div `
    width: 300px;
    height: 636px;
    display:flex;
    flex-direction: column;
    background: #463c33 url(${bg}) no-repeat;
    background-position: bottom;
    background-size: contain;
    position: relative;
`;

const Board = styled.div `
    width: 100%;
    height: 30px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    background: #f47b5b;
    position: relative;
    top: 0px;
`;

const BtnAddFriends = styled.div `
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 27px;
    font-weight: bolder;
    width: 44px;
    height: 26px;
    background: url(${addBg}) no-repeat;
    cursor: pointer;
`;

const BtnSettings = styled.div `
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 24px;
    height: 24px;
    background: url(${settings}) no-repeat;
    background-size: contain;
    cursor: pointer;
`;

const BtnSearch = styled.div `
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 24px;
    height: 24px;
    background: url(${search}) no-repeat;
    background-size: contain;
    cursor: pointer;
`;

const Footer = styled.footer`
    width: 100%;
    height: 20px;
    background-color: rgba(36, 34, 34);
    position: absolute;
    bottom: 0;
`;

let searchBar:HTMLElement;
let searchWord:HTMLInputElement;
const chats = [];

export default (props): ReactElement => {

const [friends, setFriends] = useState(false);

const listKeys = ():string[] => {
    const ids = []
    const f = JSON.parse(localStorage.getItem('profile'));
    f.friends.forEach( v => ids.push(Object.keys(v)[0]) );
    return  ids.length > 0 ? ids : [];
  }
  
useEffect(() => {
    searchBar = document.getElementById("search");
    searchWord = document.getElementById("searchword") as HTMLInputElement;
    ChatBlockObserver(setFriends);
    }, []);

return(
    <Wrapper id="chat">
        <Board>
        <BtnAddFriends onClick={ () => { searchWord.focus(); searchBar.setAttribute("style", "margin-top: 0px;")} }>+</BtnAddFriends>
        <BtnSettings/>
        <BtnSearch />
        </Board>
        <SearchPanel/>
        <ListOfFriends/>
        <FactoryOfViews/>
        <Footer/> 
    </Wrapper> 
)};
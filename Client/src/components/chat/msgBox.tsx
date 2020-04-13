/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable react/no-danger-with-children */
/*eslint @typescript-eslint/no-unused-expressions: 0*/

import React, { ReactElement, useState, useEffect } from 'react';
import Friends from '../../classes/Friends';
import { Html5Entities} from 'html-entities';
import IconsCall from '../UI/iconsCall';
import {Chat} from '../../interfaces';
import {Trident} from '../../components/UI/trident';
import {Kit} from './../UI/kitOfChatWin';

const { CSSForBubble, BtnWait, Wrapper, MonsterWithLaptop, FriendMonsterWithLaptop, Laptop,
        MyAvatar, FriendAvatar, You, YourMonster, FriendMonster, SendMsg, Messages, Bubble, BubbleGreen,
        BubbleStaticYellow,BubbleStaticGreen, Time, BtnBack} = Kit;

const NUMBER_OF_MESSAGES = 10;
let ID_OF_ELEMENT;

const entities = new Html5Entities();

let div;
let divMessages;
let len = {msg:[]};
let count = 0;

const resumeRetrieving = () => {
  if(len.msg.length) {
  count = 1;
  const l = (len.msg.length <= NUMBER_OF_MESSAGES) ? len.msg.length : NUMBER_OF_MESSAGES;
  len.msg.forEach((value) => {
    count++;
    let [user, time, msg] = value.split('>>');
    const divEl = document.createElement("div");
    const timeEl = document.createElement("div");
    const textnode = document.createTextNode(msg);
    const timenode = document.createTextNode(time);
    timeEl.appendChild(timenode);
    timeEl.classList.add("time"); 
    divEl.appendChild(timeEl); 
    divEl.appendChild(textnode);
    user = (user == 0) ? divEl.classList.add("yellowBubble", "greenBubble") : divEl.classList.add("yellowBubble");
    divMessages.insertBefore(divEl, divMessages.firstChild); 
  });
  (len.msg.length < NUMBER_OF_MESSAGES) ? document.querySelector(`#chat_${ID_OF_ELEMENT} #messages > #tri`).remove() : null; 

  const coordinates = (divMessages.children[l] as HTMLDivElement).getBoundingClientRect().y - 195;
   divMessages.scrollTo({
    top: coordinates,
    behavior: 'auto'  
  });
  len.msg = [];
}
}

export const MsgBox: React.FC<Chat> = (props:Chat): ReactElement => {

  const [state, setState] = useState({msg:null, resume: ()=>{}});
  const [transition, setTranisition] = useState(false);
  
  useEffect(() => {
    if(props.uid == props.active) { 
      div = document.getElementById(`chat_${props.uid}`);
      divMessages = document.querySelector(`#chat_${props.uid} #messages`) as HTMLDivElement
      div.style.marginLeft="0px";
      divMessages.scrollTop = divMessages.scrollHeight + 500;
     }
  });

  useEffect(()=> {
    ID_OF_ELEMENT = props.uid;
    divMessages = document.querySelector(`#chat_${props.uid} #messages`) as HTMLDivElement;
    const sendMsg = document.querySelector(`#chat_${props.uid} #sendMsg`)  as HTMLDivElement;
    
    sendMsg.addEventListener("keypress", function(event) {
    if ( (event.which == 13 || event.keyCode == 13) && !event.shiftKey) {
      
      event.preventDefault();
      
      if(sendMsg.innerText.trim().length > 0) {

        const sanitizer = entities.encode(sendMsg.innerText).replace(/(?:\r\n|\r|\n)/g, "<br>");
        const div = document.createElement("div");
        const time = document.createElement("div");
        const now = new Date().toLocaleString().split(",");
        const mhs = now[1].trim();
        const monthDay = now[0].split('.');
        const finalTime = `${monthDay[0]}/${monthDay[1]} ${mhs}`;  
        
        const timeformat = document.createTextNode(finalTime);

        div.classList.add("yellowBubble", "greenBubble");
        time.classList.add("time");

        time.appendChild(timeformat);
        div.appendChild(time);
        div.innerHTML+=sanitizer;
        divMessages.appendChild(div);

        divMessages.scrollTo({
          top: (divMessages.lastChild as HTMLDivElement).offsetTop,
          behavior: 'smooth'
        });

        sendMsg.innerText='';
        sendMsg.focus();
        Friends.addMsg(props.uid, sanitizer, 0, finalTime);
        Friends.sendMsg(props.uid, profile, sanitizer, finalTime)
      }
    }
    });
  }, []);
  
  const retrieving = (length) => {
    if(length > 0 ) {
    
    let arr = [];
  
    arr = state.msg.map((value) => {
    let [user, time, msg] = value.split('>>'); 
  
      user = (user == 0) ? 
                        <BubbleStaticGreen key={count} ><Time>{time}</Time><div dangerouslySetInnerHTML={{ __html: msg }}></div></BubbleStaticGreen> 
                        : 
                        <BubbleStaticYellow key={count} ><Time>{time}</Time><div dangerouslySetInnerHTML={{ __html: msg }}></div></BubbleStaticYellow>; 
      count++;
      return(user);  
    });
  
    (length >= NUMBER_OF_MESSAGES) ?
    
    arr.push(<Trident id="tri" key="tri" onClick={ (e) => {
          e.preventDefault();
          state.resume();
      }}/>)
      
    : null;

    return arr;
    }
  
  }
  
  const friend = Friends.getUserData(props.uid);
  
  const {displayName, avatar, uid, monster} = JSON.parse(localStorage.getItem('profile'));
  const myAvatar = (avatar == 'dracula.svg') ? 'dracula.svg' : `http://localhost:8000/upload/${avatar}`;
  const profile = {displayName, avatar: myAvatar, uid, monster}

  return(
    <>
    <CSSForBubble/>
    <Wrapper id={`chat_${props.uid}`} active={props.active}
      onTransitionEnd={ () => !transition ? setTranisition(true) : null } 
      > 
      <BtnBack onClick={ () => {
          count=0; 
          div.style.marginLeft="300px";
          (document.getElementById(props.uid)as HTMLElement).dataset.open = '0';
          }}/>
        <Messages id="messages" > 
          {

          (transition) ? (
            (state.msg===null) ? Friends.readMsg(props.uid, setState, NUMBER_OF_MESSAGES, resumeRetrieving, len) :
            retrieving(state.msg.length)) : <BtnWait/>
                     
          }
        </Messages>
        <IconsCall/>
         <FriendMonsterWithLaptop>
         <FriendMonster monster={friend.monster}/>
            <Laptop/>
            <MyAvatar avatar={friend.avatar}/>   
        </FriendMonsterWithLaptop> 
         <You>
            <SendMsg id="sendMsg" contentEditable/> 
        <MonsterWithLaptop>
            <YourMonster monster={monster}/>
            <Laptop/>
            <MyAvatar avatar={myAvatar}/>
        </MonsterWithLaptop>
        </You>
    </Wrapper>
    </>
    );
 }
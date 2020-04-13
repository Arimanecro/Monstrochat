/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { ReactElement, useState, useEffect, useContext} from 'react';
import { Context } from 'vm';
import styled, {keyframes, createGlobalStyle } from 'styled-components';
import {WS} from '../../classes/Auth';
import {updateListOfFriends, updateOfflineMsg, deleteOfflineMsg} from '../../classes/firebase';
import {MsgContext} from '../../state/msgContext';
import {ChatContext} from '../../state/chatContext';
import Friends from '../../classes/Friends';
import bgShake from '../../../public/img/shake.svg';
import bgShake1 from '../../../public/img/shake1.svg';
import bgShake2 from '../../../public/img/shake2.svg';
import Donut from './donut';

const chats = [];

const listKeys = ():string[] => {
  const ids = []
  const f = JSON.parse(localStorage.getItem('profile'));
  f.friends.forEach( v => ids.push(Object.keys(v)[0]) );
  return  ids.length > 0 ? ids : [];
}

const shake = keyframes`
  2% {
      transform: translate(.5px, -.5px) rotate(.5deg)
  }

  4% {
      transform: translate(-.5px, 2.5px) rotate(.5deg)
  }

  6% {
      transform: translate(-1.5px, 2.5px) rotate(-.5deg)
  }

  8% {
      transform: translate(-1.5px, .5px) rotate(1.5deg)
  }

  10% {
      transform: translate(1.5px, 2.5px) rotate(.5deg)
  }

  12% {
      transform: translate(-1.5px, 2.5px) rotate(1.5deg)
  }

  14% {
      transform: translate(1.5px, 1.5px) rotate(-.5deg)
  }

  16% {
      transform: translate(2.5px, -.5px) rotate(1.5deg)
  }

  18% {
      transform: translate(1.5px, .5px) rotate(.5deg)
  }

  20% {
      transform: translate(1.5px, -1.5px) rotate(-.5deg)
  }

  22% {
      transform: translate(-1.5px, -1.5px) rotate(-.5deg)
  }

  24% {
      transform: translate(-.5px, -1.5px) rotate(.5deg)
  }

  26% {
      transform: translate(-1.5px, 2.5px) rotate(-.5deg)
  }

  28% {
      transform: translate(2.5px, 1.5px) rotate(1.5deg)
  }

  30% {
      transform: translate(.5px, -.5px) rotate(1.5deg)
  }

  32% {
      transform: translate(1.5px, 2.5px) rotate(1.5deg)
  }

  34% {
      transform: translate(-1.5px, -1.5px) rotate(-.5deg)
  }

  36% {
      transform: translate(-.5px, .5px) rotate(-.5deg)
  }

  38% {
      transform: translate(1.5px, -1.5px) rotate(1.5deg)
  }

  40% {
      transform: translate(-.5px, .5px) rotate(1.5deg)
  }

  42% {
      transform: translate(2.5px, -.5px) rotate(1.5deg)
  }

  44% {
      transform: translate(-1.5px, 2.5px) rotate(.5deg)
  }

  46% {
      transform: translate(-.5px, 2.5px) rotate(-.5deg)
  }

  48% {
      transform: translate(1.5px, -.5px) rotate(1.5deg)
  }

  50% {
      transform: translate(1.5px, -.5px) rotate(1.5deg)
  }

  52% {
      transform: translate(.5px, .5px) rotate(-.5deg)
  }

  54% {
      transform: translate(-.5px, -1.5px) rotate(-.5deg)
  }

  56% {
      transform: translate(1.5px, -1.5px) rotate(1.5deg)
  }

  58% {
      transform: translate(.5px, 1.5px) rotate(1.5deg)
  }

  60% {
      transform: translate(-.5px, -.5px) rotate(1.5deg)
  }

  62% {
      transform: translate(-.5px, .5px) rotate(1.5deg)
  }

  64% {
      transform: translate(.5px, -.5px) rotate(1.5deg)
  }

  66% {
      transform: translate(2.5px, .5px) rotate(1.5deg)
  }

  68% {
      transform: translate(1.5px, -.5px) rotate(1.5deg)
  }

  70% {
      transform: translate(.5px, 2.5px) rotate(1.5deg)
  }

  72% {
      transform: translate(1.5px, -.5px) rotate(.5deg)
  }

  74% {
      transform: translate(2.5px, -.5px) rotate(.5deg)
  }

  76% {
      transform: translate(2.5px, -.5px) rotate(1.5deg)
  }

  78% {
      transform: translate(-1.5px, -.5px) rotate(-.5deg)
  }

  80% {
      transform: translate(-1.5px, .5px) rotate(-.5deg)
  }

  82% {
      transform: translate(-1.5px, 2.5px) rotate(.5deg)
  }

  84% {
      transform: translate(-.5px, .5px) rotate(1.5deg)
  }

  86% {
      transform: translate(-1.5px, 1.5px) rotate(.5deg)
  }

  88% {
      transform: translate(-.5px, -.5px) rotate(1.5deg)
  }

  90% {
      transform: translate(-1.5px, -1.5px) rotate(1.5deg)
  }

  92% {
      transform: translate(2.5px, 1.5px) rotate(.5deg)
  }

  94% {
      transform: translate(2.5px, 1.5px) rotate(-.5deg)
  }

  96% {
      transform: translate(2.5px, -.5px) rotate(.5deg)
  }

  98% {
      transform: translate(1.5px, .5px) rotate(-.5deg)
  }

  0%,100% {
      transform: translate(0, 0) rotate(0)
  }
`;

const bounceIn =  keyframes`
0%,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }

`;

const CSSForBubble = createGlobalStyle`

@keyframes zoomIn {
    0% {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
}

@keyframes rotate {
     0% {
        transform: rotate(0deg);
}
 to {
     transform: rotate(1turn);
   }
}

@keyframes zoomOut {
    from {
        opacity: 1;
    }

    50% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
    }

    to {
        opacity: 0;
    }
}
    .yellowBubble {
      width: auto;
      max-width: 94%;
      min-width: 110px;
      height: auto;
      align-self: flex-start;
      margin: 25px 0px 0px;
      padding: 5px;
      background: #f9d33d;
      border-radius: 10px;
      border: black 2px solid;
      position: relative;
      z-index:1;
      animation-duration: 0.75s;
      animation-name: ${bounceIn};
    }
      .yellowBubble > div {
        left: 4px;
        right:unset;
    }

    .greenBubble {
      background: #93c01f;
      align-self: flex-end;   
    } 
    
    .greenBubble > div {
      left:unset;
      right:4px;
   }
  
    .time {
      width: auto;
      height: 18px;
      border: black thin solid;
      background: black;
      font-size: 14px;
      color: #fdfdfd;
      text-align: center;
      position: absolute;
      margin-top: -26px;
      right: 4px;
    }
    
`;

const NewMsg = styled.div`
    display: ${ props => Friends.offlineMsg[props.uid] ? "block" : "none"};
    width: 49px;
    height: 39px;
    background: url(${bgShake1}) no-repeat;
    background-size: contain;
    animation-name: ${shake};
    animation-duration: 1000ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
`;

const List = React.memo(styled.div `
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    border: #f47b5b 3px solid;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
      }
`); 

const UserWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: rgb(255, 172, 53);
    width: 96%;
    height: 48px;
    min-height: 49px;
    margin: 5px auto 0px;
    padding: 0 2px;
    cursor: pointer;
    position: relative;
  `;

const Avatar = React.memo(styled.div`    
    border-width: 1px;
    border-color: rgb(0, 0, 0);
    border-style: solid;
    border-radius: 50%;
    background: url(${props => (props.user === "dracula.svg") ? './img/dracula.svg' : `${props.user}` });
    background-size: contain;
    background-position: center;
    width: 44px;
    height: 44px;
`);

const DisplayName = React.memo(styled.div` 
    width: 142px;
    height: auto;
    font-family: 'Conv_Caviar_Dreams_Bold';
    font-size: 16px;
    color: black;
    text-align: center;
    margin: 0 auto;
`);

const Zero = React.memo(styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    color: #f50068;
    font-family: 'Conv_JosefinSlab-Bold';
    font-size: 22px;
`);

export const ListOfFriends = (): ReactElement => {

    let friend = [];

    if(localStorage.getItem('profile')) {
      const {friends} = JSON.parse(localStorage.getItem('profile')); 
      friend = friends; 
    }
    
    const listOfChats = useContext(MsgContext); 
    const [state, setState] = useState(true);
    (ChatContext as Context)._currentValue.rerenderList = setState;
    
    useEffect( ()=> {

      WS.socket.on('private', (profile, msg) => {
        const {displayName, avatar, monster, uid} = profile;
        const user = JSON.parse(localStorage.getItem('profile')); 
        Friends.topmostUser({[uid]: JSON.stringify({displayName, avatar, monster})}, user);
        Friends.addMsgWithSocket(uid, msg);
        const match = listKeys(); 
         !match.includes(profile.uid) ? updateListOfFriends(user.uid, uid, profile, false) : null;
         Friends.openChatDialogs(uid);
         if(!chats.includes(uid)) { chats.push(uid) } 
         setState(props => !props);
      });

      WS.socket.on('offline', (receiverID, profile, msg) => { 
        updateOfflineMsg(receiverID, profile,  msg);
      });

      WS.socket.on('whoIsOnline', (id) => {
        const el = (document.getElementById(id) as HTMLDivElement);
        if(el){
            (el.children[1] as HTMLElement).style.display="flex";
            (el.children[1] as HTMLElement).style.animation= 'zoomIn .45s linear, rotate 4s linear .45s infinite';  
        } 
    })

      WS.socket.on('checkOnlineFriends', (ids) => {
          ids.forEach(v => {
            const el = (document.getElementById(v) as HTMLDivElement);
            if(el){
                (el.children[1] as HTMLElement).style.display="flex";
                (el.children[1] as HTMLElement).style.animation= 'zoomIn .45s linear, rotate 4s linear .45s infinite';  
            }
        }
      )});

      WS.socket.on('checkOfflineFriends', (id) => {
        const el = (document.querySelector(`#${id} > #donut`) as HTMLElement);
        el ? el.style.animation="0.45s linear 0s 1 normal forwards running zoomOut" : null;
      })

    }, [])
    
    const startChat = (id) => {
        if(!chats.includes(id)) { chats.push(id) }
        listOfChats.rerenderListChats({chats, active: id});
    }

    const list = () => { return friend.map( (v,k) => {
        const recipient = Object.keys(v)[0];
        const {avatar, displayName, monster} = JSON.parse(friend[k][recipient]);
        return(
        <UserWrapper data-open={0} id={recipient} key={recipient} onClick={ () =>  {
            const user = JSON.parse(localStorage.getItem('profile'));
            const el = document.getElementById(recipient);
            (el.children[3] as HTMLElement).style.display="none";
            el.dataset.open = '1';
            Friends.offlineMsg[recipient] && deleteOfflineMsg(user.uid, recipient)
            delete Friends.offlineMsg[recipient];
            startChat(recipient);
            Friends.topmostUser({[recipient]: JSON.stringify({displayName, avatar, monster})}, user);
            localStorage.setItem('profile', JSON.stringify({...user }));
            setState(props => !props);   
        }}>
            <Avatar user={avatar}/>
            <Donut />
            <DisplayName>{displayName.charAt(0).toUpperCase() + displayName.slice(1)}</DisplayName>
            <NewMsg id="newmsg" uid={recipient}/>
        </UserWrapper>);
    })};

    return(
        <>
        <CSSForBubble/>
        {Friends.count() ? <List id="listOnline">{list()}</List> : <Zero>0 friends</Zero>}
        </>);
}
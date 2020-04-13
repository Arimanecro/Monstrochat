import React from 'react';
import styled, {keyframes, createGlobalStyle} from 'styled-components';
import msgBg from '../../../public/img/bgMsgBox.jpg';
import laptop from '../../../public/img/laptop.svg';
import Back from '../../../public/img/btn_back.png';
import bgWait from '../../../public/img/wait2.svg';
import * as icons from '../../components/UI/monstericons';
const monster = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile'))['monster'] :  null;

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
          word-break: break-all;
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

const BtnWait = React.memo(styled.div`
    width: 56px;
    height: 56px;
    background:url(${bgWait}) no-repeat;
    background-size: cover;
    margin: 0 auto;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    left: 0px;
    right: 0px;
    margin-top: 50%;
`);

const Wrapper = styled.div`
    width: 300px;
    height: 636px;
    margin-left: 300px;
    display:flex;
    flex-direction: column;
    background: #463c33 url(${msgBg}) no-repeat;
    position: absolute;
    z-index:2;
    transition: all ease .55s;
`;

const MonsterWithLaptop = React.memo(styled.div`
    width: 110px;
    height: 100px;
    position: absolute;
    right: 0px;
`);

const FriendMonsterWithLaptop = styled(MonsterWithLaptop)`
    left: 0px;
`;

const Laptop = React.memo(styled.div`
    width: 110px;
    height: 100px;
    background: url(${laptop}) no-repeat;
    background-position: bottom;
    position:absolute;
    z-index:5;
`);

const MyAvatar = React.memo(styled.div`
    border-width: 1px;
    border-color: rgb(0, 0, 0);
    border-style: solid;
    border-radius: 50%;
    background: url(${props => (props.avatar == 'dracula.svg') ? './img/dracula.svg' : props.avatar} );
    background-size: contain;
    background-position: center;
    width: 32px;
    height: 33px;
    position: absolute;
    top: 54px;
    left: 52px;
    z-index:6;
`);

const FriendAvatar = styled(MyAvatar)`
    background: url(${props => (props.avatar == 'dracula.svg') ? './img/dracula.svg' : `http://localhost:8000/upload/${props.avatar}` });
    background-size: contain;
    background-position: center;
`;

const You = React.memo(styled.div`
    display: flex;
    width: 300px;
    height: 100px;
    bottom: 0px;
    position: absolute;
`);

const YourMonster = React.memo(styled.div`
  width: 80px;
  height: 100px;
  background: url(${props => icons['m_'+props.monster]}) no-repeat;
  position: absolute;
  right:0;
  z-index:3;
`);

const FriendMonster = styled(YourMonster)`
  background: url(${props => icons['m_'+props.monster]}) no-repeat;
  top:0;
  right:0;
  z-index:3;
`;

const SendMsg = React.memo(styled.div`
    border: none;
    outline: none;
    background-color: rgba(18, 1, 1, 0.59);
    position: absolute;
    width: 100%;
    height: 100px;
    color: white;
    font-family: 'Nunito';
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
    line-height: 20px;
    padding-left: 5px;
    overflow: hidden;
    overflow-y: scroll;
    z-index: 7;     
    
    &::-webkit-scrollbar {
        display: none;
      }
`);

const Messages = styled.div`
    width: 300px;
    height: 430px;
    margin-top: 98px;
    display:flex;
    flex-direction: column;
    color: black;
    border-top: 5px #50718c solid;
    font-family: 'Conv_Caviar_Dreams_Bold';
    font-size: 16px;
    
    overflow-x: hidden;
    overflow-y: scroll;
    position: absolute;
    z-index: 2;     
    
    &::-webkit-scrollbar {
        display: none;
      }
`;

const Bubble = styled.div`
   width: auto;
   max-width: 94%;
   min-width: 110px;
   height: auto;
   align-self: flex-start;
   word-break: break-word;
   margin: 25px 0px 0px;
   padding: 5px;
   background: #f9d33d;
   border-radius: 10px;
   border: black 2px solid;
   position: relative;
   z-index:1;
   animation-duration: 0.75s;
   animation-name: ${bounceIn};

   & > div {
     left: 4px;
     right:unset;
 }

`;

const BubbleGreen = styled(Bubble)`
      background: #93c01f;
      align-self: flex-end;   
      
      & > div {
      left:unset;
      right:4px;
   }
`;

const BubbleStaticYellow = styled(Bubble)`
animation-name: unset;
`;

const BubbleStaticGreen = styled(BubbleGreen)`
animation-name: inset;
`;

const Time = React.memo(styled.div`
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
`);

const BtnBack = React.memo(styled.button`
    width: 22px;
    height: 22px;
    border: none;
    outline:none;
    background: url(${Back}) no-repeat;
    background-size: cover;
    position: absolute;
    z-index: 8;
    top: 5px;
    left: 0px;
    transform: rotate(90deg);
    cursor: pointer;
`);

export const Kit = {
    CSSForBubble, BtnWait, Wrapper, MonsterWithLaptop, FriendMonsterWithLaptop, Laptop,
    MyAvatar, FriendAvatar, You, YourMonster, FriendMonster, SendMsg, Messages, Bubble, BubbleGreen,BubbleStaticYellow,
    BubbleStaticGreen,Time, BtnBack
}
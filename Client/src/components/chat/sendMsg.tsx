import React from 'react';
import styled, {keyframes} from 'styled-components';

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

const SendMsg = styled.div`
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
`;

const Bubble = styled.div`
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

const Time = styled.div`
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
`;


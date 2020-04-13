/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { ReactElement, useState, useEffect } from 'react';
import {MsgContext} from '../../state/msgContext';
import { Context } from 'vm';
import {MsgBox} from './msgBox';
import {ChatState} from '../../interfaces';

export default (props): ReactElement => {
    const [state, setState] = useState({chats: [], active: ""} as ChatState);

    (MsgContext as Context)._currentValue.rerenderListChats = setState;
    return(<> 
    {
    state.chats.length > 0 ? 
    state.chats.map((v,k) => <MsgBox key={v} uid={v} active={state.active}/>) 
    : null
    } 
    </>);
 }
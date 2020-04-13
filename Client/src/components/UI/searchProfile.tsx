import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import {ReactProps} from '../../interfaces';
import BtnWait from '../UI/btnWaitBlack';
import {BtnAdd} from '../UI/btnAdd';
import {BtnDelete} from '../UI/btnDelete';

const UserWrapper = React.memo(styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: rgb(234, 172, 4);
    width: 233px;
    min-height: 49px;
    margin: 5px auto 0px;
    padding: 0 2px;
  `);

const Avatar = React.memo(styled.div`    
    border-width: 1px;
    border-color: rgb(0, 0, 0);
    border-style: solid;
    border-radius: 50%;
    background: url(${props => (props.user === "dracula.svg") ? './img/dracula.svg' : `http://localhost:8000/upload/${props.user}` });
    background-size: cover;
    background-position: center;
    width: 44px;
    height: 44px;
`);

const DisplayName = React.memo(styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 142px;
    height: auto;
    font-family: 'Conv_Caviar_Dreams_Bold';
    font-size: 16px;
    color: black;
    text-align: center;
`);

const listKeys = ():string[] => {
    const ids = []
    const f = JSON.parse(localStorage.getItem('profile'));
    f.friends.forEach( v => ids.push(Object.keys(v)[0]) );
    return  ids.length > 0 ? ids : [];
}

const Search:React.FC<ReactProps> = (props:ReactProps): ReactElement => {

    const match = listKeys();
    const[state, setState] = useState(null);
    const list = Object.keys(props.user).map( (v,k) => {
        return(
        <UserWrapper key={props.user[v].displayName}>
            <Avatar user={props.user[v].avatar}/>
            <DisplayName>{props.user[v].displayName.charAt(0).toUpperCase() + props.user[v].displayName.slice(1)}</DisplayName>
           {
           (state === null && !match.includes(v)) ? <BtnAdd id={[v, props.user[v]]} render={setState} /> 
                            : ((state===false) ? <BtnWait/> : <BtnDelete id={[v, props.user[v]]} render={setState}/>)
                        }
 
        </UserWrapper>);
    });
    return ( <>{list}</>);
} 

export const SearchProfile = React.memo(Search);
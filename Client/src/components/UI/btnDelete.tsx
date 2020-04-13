import React, {ReactElement} from 'react';
import {deleteFromListOfFriends} from '../../classes/firebase';
import styled from 'styled-components';
import {ReactProps} from '../../interfaces';
import bgDelete from '../../../public/img/delete.png';

const ButtonDelete = React.memo(styled.div`
    width: 28px;
    height: 28px;
    background:url(${bgDelete}) no-repeat;
    background-size: contain;
    margin: 0 auto;
    cursor: pointer;
`);

export const BtnDelete:React.FC<ReactProps> = (props:ReactProps): ReactElement =>  {    
    const [id, user] = props.id;
    const {uid} = JSON.parse(localStorage.getItem('profile')); 
    return (<ButtonDelete onClick={()=>deleteFromListOfFriends(uid, id, props.render)}/>)
}

import React, {ReactElement} from 'react';
import {updateListOfFriends} from '../../classes/firebase';
import styled from 'styled-components';
import {ReactProps} from '../../interfaces';
import bgAdd from '../../../public/img/add.png';

const ButtonAdd = styled.div` 
    width: 34px;
    height: 34px;
    background:url(${bgAdd}) no-repeat;
    background-size: contain;
    cursor: pointer;
`;

export const BtnAdd:React.FC<ReactProps> = (props:ReactProps): ReactElement =>  {
    
    const [id, user] = props.id;
    const {uid} = JSON.parse(localStorage.getItem('profile'));

    return(<ButtonAdd id={id} onClick={()=>{
        updateListOfFriends(uid, id, user, props.render);
    }}/> );
}
import React, { ReactElement, useState} from 'react';
import styled from 'styled-components';
import {СheckerError} from '../../classes/validation/validator';
import BtnOK from '../UI/btnOK';
import {Monsters} from './monsters';
import Back from '../../../public/img/btn_back.png';
import bgUp from '../../../public/img/up_select.png';

// eslint-disable-next-line @typescript-eslint/no-var-requires

const WrapperList = React.memo(styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    min-height: 380px;
    height: auto;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.749);  
    font-family: 'Conv_mouth_breather';
    font-size: 72px;
    text-align:center;
    color: #f47b5b;
    padding: 10px 0px;
    position: relative;
`);

const Title = React.memo(styled.span`
    color: #fffa4a;
    font-size: 14px;
    margin-top: 10px;
`);

const List = React.memo(styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    width: 282px;
    height: 200px;
    margin-top: 10px;
    padding: 10px 0px;
    box-sizing: border-box;
    border-top-color: #638115;
    border-top-width: 2px;
    border-top-style: solid;
    border-bottom-color: #638115;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    margin-bottom: 10px;
    overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
      }
    
`);

const Bar = React.memo(styled.div`
      display: flex;
      justify-content: space-between;
      width: inherit;
      height: auto;
`);

const UpperMonster = React.memo(styled.div`
    width: 92px;
    height: 64px;
    background: url(${bgUp}) no-repeat;
    align-self: flex-end;
    margin-top: -10px;
`);

const BtnBack = React.memo(styled.button`
    width: 22px;
    height: 22px;
    border: none;
    background: url(${Back}) no-repeat;
    background-size: cover;
    top: 5px;
    left: 0px;
    transform: rotate(90deg);
    cursor: pointer;
`);

export const ListOfMonsters = (): ReactElement => {
    const [error] = useState(null);
    return ( 
    <WrapperList id="listofmonsters">
        <Bar>
        <BtnBack disabled={false} id="back" onClick={ ()=>{ 
            document.getElementById('WrapperBtns').setAttribute("style", "margin-left: -300px;");
        }}/>    
        <UpperMonster/>
        </Bar>
        { error && <СheckerError error={error} /> }
        <Title>select your monster</Title>
        <List>
            <Monsters/>
        </List>
        <BtnOK />
    </WrapperList>
    )
}
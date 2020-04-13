import React, { ReactElement} from 'react';
import styled from 'styled-components';
const ELECTRON_IS_DEV = 0;
const fs = window.require('fs');
const path = window.require('path');

const Monster = React.memo(styled.div`
    width: 54px;
    height: 54px;
    border: white thin solid;
    background: url(${props => (props.bg == '/img/monsters/m_1.svg') ? `img/table.svg) no-repeat bottom, url(${props.bg}) no-repeat bottom center;` 
                                                      : `${props.bg}) no-repeat bottom center;`}
    background-size: contain;
    background-position: bottom center;
    cursor: pointer;
`);

const list = fs.readdirSync( ELECTRON_IS_DEV ? `./public/img/monsters` :  `${path.join(__dirname,'/img/monsters')}`);

let last = "m0";

const activeMonster = (current, bck):string => {
    if((last != current)) {
    const l = document.getElementById(last) as HTMLElement;
    const bg = window.getComputedStyle(l).backgroundImage.split(",")[1];
    l.setAttribute("style", `background:${bg} no-repeat bottom center`);
    const c = document.getElementById(current) as HTMLElement;
    c.setAttribute("style", `background: url(img/table.svg) no-repeat bottom, url(${bck}) no-repeat bottom center`); 
    return last = current;
}
}

export const Monsters = (): ReactElement => { 
    return(
    <>
    {list.map((bg,k) => (

    <Monster onClick={ (e)=> {
              const profile = JSON.parse(localStorage.getItem('profile'))
              localStorage.setItem('profile', JSON.stringify({...profile, monster:bg.split('_')[1].split('.')[0] }));
              activeMonster(`m${k}`, `img/monsters/${bg}`)
             }} 
             key={k}
             id={`m${k}`}
             bg={ `img/monsters/${bg}`}
   /> 
  )
  )}
    </>);
}
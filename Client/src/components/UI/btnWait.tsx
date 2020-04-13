import React, {ReactElement} from 'react';
import styled from 'styled-components';
import bgWait from '../../../public/img/wait.svg';

const BtnWait = React.memo(styled.div`
    width: 28px;
    height: 28px;
    background:url(${bgWait}) no-repeat;
    background-size: cover;
    margin: 0 auto;
    border: none;
    outline: none;
    cursor: pointer;
`);

export default (): ReactElement => { return(<BtnWait/>);}

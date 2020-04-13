import React, { ReactElement, useState } from 'react';
import Registration from '../../classes/Registration';
import styled from 'styled-components';
import Spinner from '../UI/spinner';

const ButtonOK = styled.div`{
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 2px;
    border-color: rgb(60, 248, 207);
    border-style: solid;
    width: 59px;
    height: 19px;
    color: #fffa4a;
    font-size: 14px;
    cursor: pointer;
  }`;

export default (): ReactElement => {
    const [state, setState] = useState<null>(null);
    const CreateNewUser = new Registration(setState);
    return !state ? <ButtonOK onClick={() => CreateNewUser.sendProfile()}>ok</ButtonOK> : <Spinner style={{}}/>;
};
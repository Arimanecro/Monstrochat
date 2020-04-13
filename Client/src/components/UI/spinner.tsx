import React, { ReactElement } from 'react';
import styled from 'styled-components';
import bgSpinner from '../../../public/img/spinner.svg';

const Spinner = styled.div`
    width: 30px;
    height: 30px;
    background:url(${bgSpinner}) no-repeat;
    background-size: contain;
    margin-top: ${props => props.style ? 0 : -44}px;
`

export default (props): ReactElement => <Spinner {...props} />;
import styled, {keyframes} from 'styled-components';
import bgTrident from '../../../public/img/arrow_hand.png';

const bounceIn =  keyframes`
    0% {top: 0px;}
    50% { top: 5px;}
    100% { top: 0px}
`

export const Trident = styled.div`
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background:url(${bgTrident}) no-repeat center;
    background-color: #ee47a891; 
    background-size: contain;
    position: absolute;
    left: 42%;
    cursor: pointer;
    z-index: 9;
    animation: ${bounceIn} 0.75s infinite;
`
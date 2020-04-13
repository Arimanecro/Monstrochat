import React, {ReactElement} from 'react';
import styled from 'styled-components';
import bgPhone2 from '../../../public/img/phone2.svg';
import bgCamera from '../../../public/img/camera.svg';

const Wrapper = React.memo(styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 100px;
    position: absolute;
    right: 0;
`);

const WrapperIcons = React.memo(styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40px;
    height: 92px;
    flex-direction: column;
    position: absolute;
    right: 0;
    bottom: 3px;
`);

const IcoCall = React.memo(styled.div`
    width: 24px;
    height: 24px;
    background:url(${bgPhone2}) no-repeat;
    background-size: contain;
    cursor: pointer;
    opacity: 0.5;
`);

const VideoCall = React.memo(styled(IcoCall)`
    width: 40px;
    height: 40px;
    background:url(${bgCamera}) no-repeat;
    background-size: contain;
    opacity: 0.5;
`);

export default (): ReactElement => { 
    return(
    <Wrapper>
        <WrapperIcons>
            <IcoCall/>
            <VideoCall/>   
        </WrapperIcons>   
    </Wrapper>);
}

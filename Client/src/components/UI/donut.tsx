import React, {ReactElement} from 'react';
import styled from 'styled-components';
import bgDonut2 from '../../../public/img/donut2.png';
import bgDonut3 from '../../../public/img/donut3.png';
import bgDonut4 from '../../../public/img/donut4.png';
import bgDonut5 from '../../../public/img/donut5.png';
import bgDonut6 from '../../../public/img/donut6.png';
import bgDonut7 from '../../../public/img/donut7.png';
import bgDonut8 from '../../../public/img/donut8.png';

const randomDonut = () => { 
  const donuts = [bgDonut2, bgDonut3, bgDonut4, bgDonut5, bgDonut6, bgDonut7, bgDonut8];
  return donuts[Math.floor(Math.random() * donuts.length)];
}

const Wrapper = styled.div`
    display: none;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.67);
    position: absolute;
    top: 9px;
    left: 33px;
    border-radius: 50%;
    
`;

const Donut = styled.div`{
    width: 28px;
    height: 28px;
    background:url(${randomDonut()}) no-repeat;
    background-size: contain;
    top: 9px;
    left: 33px;
    
}`;

export default (): ReactElement => { 
    return <Wrapper id="donut"><Donut/></Wrapper>;
}
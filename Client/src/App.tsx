import React, { ReactElement }  from 'react';
import {GlobalCSS}  from './components/GlobalCSS';
import Welcome from './components/authReg/welcome';

export default (): ReactElement => {
    return (
    <GlobalCSS>
        <Welcome />
    </GlobalCSS >   
    );
};

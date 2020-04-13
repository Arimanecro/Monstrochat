import { createContext } from 'react';
import {UserError} from '../interfaces';

const error:UserError = {
    setError:()=>{}

}

export const UserErrorContext = createContext(error);
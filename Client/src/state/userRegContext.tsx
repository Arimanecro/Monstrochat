import { createContext } from 'react';
import {UserProfile} from '../interfaces';


  const profile:UserProfile = {
      email: null,
      displayName: null,
      password: null,
      avatar: 'dracula.svg',
      monster: "0",  
      setCurrentProfile: () => {}
}

export const UserRegContext = createContext(profile);
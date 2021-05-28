import Axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types';

export function LoginUser(dataToSubmit){
    const req = Axios.post('/api/user/login', dataToSubmit)
    .then(res => res.data)
    
    return {
        type : LOGIN_USER,
        payload : req,
    }
}

export function RegisterUser(dataToSubmit){
    const req = Axios.post('/api/user/register', dataToSubmit)
    .then(res => res.data)
    return {
        type : REGISTER_USER,
        payload : req,
    }
}
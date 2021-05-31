import Axios from 'axios';
import { AUTH_USER, LOGIN_USER, REGISTER_USER } from './types';

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

export function auth(){
    const req = Axios.get('/api/user/auth')
    .then(res => res.data)
    return {
        type : AUTH_USER,
        payload : req,
    }
}
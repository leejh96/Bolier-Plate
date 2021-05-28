import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../../_action/user_action';
function LoginPage(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onEmailHandler =  (e) => {
        setEmail(e.target.value)
    };
    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    };
    const onSubmitHandler = (e) => {
        e.preventDefault(); //없으면 리렌더링이 된다.
        let body = {
            email,
            password,
        }
        dispatch(LoginUser(body))
        .then(res => {
            if(res.payload.loginSuccess){
                props.history.push('/');
            }else{
                alert('error');
            }
        })
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form onSubmit={onSubmitHandler}style={{display : 'flex', flexDirection: 'column'}}>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler}></input>
                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler}></input>
                <br />
                <button type="submit">
                    Login
                </button>
            </form>  
        </div>
    )
}

export default LoginPage

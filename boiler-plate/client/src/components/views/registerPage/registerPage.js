import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { RegisterUser } from '../../../_action/user_action';

function RegisterPage(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onEmailHandler =  (e) => {
        setEmail(e.target.value)
    };
    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    };
    const onNameHandler = (e) => {
        setName(e.target.value)
    };
    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value)
    };
    const onSubmitHandler = (e) => {
        e.preventDefault(); //없으면 리렌더링이 된다.
        if(password !== confirmPassword){
            return alert('비밀번호를 다시 확인하세요');
        }
        let body = {
            email,
            password,
            name,
        }
        dispatch(RegisterUser(body))
        .then(res => {
            if(res.payload.success){
                props.history.push('/login');
            }else{
                alert('Failed to sign up');
            }
        })
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form onSubmit={onSubmitHandler}style={{display : 'flex', flexDirection: 'column'}}>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler}></input>
                <label>Name</label>
                <input type="text" value={name} onChange={onNameHandler}></input>
                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler}></input>
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler}></input>
                <br />
                <button type="submit">
                    회원가입
                </button>
            </form>  
        </div>
    )
}
export default withRouter(RegisterPage)

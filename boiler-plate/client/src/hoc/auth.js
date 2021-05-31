import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {auth} from '../_action/user_action';
export default function (SpecificComponent, option, adminRoute = null){
    // option = >   1. null : 아무나 출입가능
                    // 2. true : 로그인 한 유저만 출입가능
                    // 3. false : 비로그인 한 유저만 출입가능

    // adiminRoute => 관리자만 출입가능
    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth())
            .then(res => {
                console.log(res);
                //로그인 x
                if(!res.payload.isAuth){
                    if(option){
                        props.history.push('/login');
                    }
                }else{
                    //로그인 o
                    if(adminRoute && !res.payload.isAdmin){
                        props.history.push('/');
                    }else{
                        if(option === false){
                            props.history.push('/');
                        }
                    }
                }
            })
        }, [])
        return <SpecificComponent />
    }
    return AuthenticationCheck
}
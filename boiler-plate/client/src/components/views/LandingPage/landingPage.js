import React, { useEffect } from 'react';
import axios from 'axios';

// port가 다른 두 서버는 아무설정없이 Request를 보낼수 없다.
// 보안을 위해서!!
// Proxy를 사용하여 해결할 수 있다.

function LandingPage(props) {
    useEffect(() => {
        //setupProxy에서 target을 설정해주었기 때문에 /api/hello 앞에
        //http://localhost:5000 은 쓰지 않는다.
        axios.get('/api/hello')
        .then(res => console.log(res.data))
    }, [])

    const onClickHandler = () => {
        axios.get('/api/user/logout')
        .then(res => {
            if(res.data.success){
                props.history.push('/login');
            }else{
                alert('로그아웃 실패!');
            }
        })
    };
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage

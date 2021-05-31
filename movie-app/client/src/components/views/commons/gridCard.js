import React from 'react';
import { Col } from 'antd';

function gridCards(props) {
    if(props.landingPage){
        return (
            //한컬럼에 24사이즈 즉 화면이크면 4개의 컬럼 작아지면 3개 더작아지면 1개
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative'}}>
                    <a href={`/movie/${props.movieId}`} >
                        <img style={{width: '100%', height: '320px'}}src={props.image} alt={props.movieName}/>
                    </a>
                </div>
            </Col>
    
        )
    }else{
        return (
            //한컬럼에 24사이즈 즉 화면이크면 4개의 컬럼 작아지면 3개 더작아지면 1개
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative'}}>
                    <img style={{width: '100%', height: '320px'}}src={props.image} alt={props.characterName}/>
                </div>
            </Col>
    
        )
    }

}

export default gridCards

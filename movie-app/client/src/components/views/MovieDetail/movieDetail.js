import React, { useState, useEffect } from 'react';
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Section/mainImage';
import MovieInfo from './Section/movieInfo';
import GridCards from '../commons/gridCard';
import Favorite from  '../MovieDetail/Section/favorite';
import { Row, Button } from 'antd';
function movieDetail(props) {
    let movieId = props.match.params.movieId;
    const [movie, setMovie] = useState([]);
    const [casts, setCasts] = useState([]);
    const [actorToggle, setActorToggle] = useState(false);
    useEffect(()=> {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${movieId}?language=ko&api_key=${API_KEY}`
        
        fetch(endpointInfo)
        .then(res =>  res.json())
        .then(res => {
            setMovie(res)
        })

        fetch(endpointCrew)
        .then(res =>  res.json())
        .then(res => {
            setCasts(res.cast)
        })
    }, [])

    const toggleActorView = () => {
        setActorToggle(!actorToggle)
    }
    return (
        <div>
            {/* 헤더 */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`} 
                title={movie.original_title}
                text={movie.overview}
            />

            {/* 바디 */}
            <div style={{width : '85%', margin: '1rem auto'}}>
                <Favorite movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                {/* 영화 정보 */}
                <MovieInfo 
                    movie={movie}
                />
                <br />
                {/* 배우 정보 */}
                <div style ={{display : 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <Button onClick={toggleActorView}>배우</Button>
                </div>
                {actorToggle &&
                <Row gutter={[16, 16]}>
                    {casts && casts.map((cast, i) => (
                        <React.Fragment key={i}>
                            <GridCards 
                                image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                characterName={cast.name}
                            />

                        </React.Fragment>
                    ))}

                </Row>}
            </div>
        </div>
    )
}

export default movieDetail

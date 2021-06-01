import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from  './Section/mainImage';
import GridCards from '../commons/gridCard';
import { Row, Button } from 'antd';
function LandingPage() {
    const [movies, setMovies] = useState([]);
    const [mainMovieImage, setMainMovieImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=${currentPage}`
        fetchMovies(endpoint);
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            setMovies([...movies, ...res.results]);
            setMainMovieImage(res.results[0]);
            setCurrentPage(res.page)
        })
    };
    const loadMoreMovie = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=${currentPage + 1}`
        fetchMovies(endpoint)
    };    
    return (
        <div style= {{width : "100%", margin: 0}}>
            {mainMovieImage &&
                <MainImage 
                image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`} 
                title={mainMovieImage.original_title}
                text={mainMovieImage.overview}
                />
            }
            <div style={{width: '85%', margin: '1rem auto'}}>
                <h2>최신 영화</h2>
                <hr />

                <Row gutter={[16, 16]}>
                    {movies && movies.map((movie, i) => (
                        <React.Fragment key={i}>
                            <GridCards
                                landingPage 
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />

                        </React.Fragment>
                    ))}

                </Row>
            </div>
            <div style={{display:'flex', justifyContent: 'center'}}>
                <Button onClick={loadMoreMovie}>더보기</Button>
            </div> 
        </div>
    )
}

export default LandingPage

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './favorite.css';
import { Button, Popover } from 'antd';
import {IMAGE_BASE_URL} from '../../Config';

function FavoritePage() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem('userId')})
        .then(res => {
            if(res.data.success){
                fetchFavoredMovie()
            }else{
                alert('영화 정보를 가져오는데 실패했습니다')
            }
        })
    }, [])

    const fetchFavoredMovie = () => {
        axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem('userId')})
        .then(res => {
            if(res.data.success){
                setFavorites(res.data.favorites);
            }else{
                alert('영화 정보를 가져오는데 실패했습니다')
            }
        })
    }
    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        };

        axios.post('/api/favorite/removeFromFavorite', variables)
        .then(res => {
            if(res.data.success){
                fetchFavoredMovie()
            }else{
                alert('리스트를 지우는데 실패했습니다.');
            }
        })
    };

    const renderCards = favorites.map((favorite, i) => {
        const content = (
            <div>
                {favorite.moviePost ? <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "No Image"}
            </div>
        )
        return <tr key ={i}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>

            </Popover>
            <td>{favorite.movieRunTime}</td>
            <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>제거</Button></td>
        </tr>
    });

    return (
        <div style={{ width :  '85%', margin : '3rem auto' }}>
            <h2> 내 영화 </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>영화 제목</th>
                        <th>상영 시간</th>
                        <th>좋아요 제거</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage

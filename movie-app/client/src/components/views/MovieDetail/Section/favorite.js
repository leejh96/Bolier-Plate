import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Button} from 'antd';
function Favorite(props) {
    const movieId =props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;
    
    const [favoriteNumber, setFavoriteNumber] = useState(0);
    const [favorited, setFavorited] = useState(false);

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime,
    }

    useEffect(() => {
        //영화의 좋아요 갯수
        axios.post('/api/favorite/favoriteNumber', variables)
        .then(res => {
            if(res.data.success){
                setFavoriteNumber(res.data.favoriteNumber);
            }else{
                alert('좋아요 정보를 가져오는데 실패했습니다.');
            }
        })
        //내가 좋아요한 영화인가 확인
        axios.post('/api/favorite/favorited', variables)
        .then(res => {
            if(res.data.success){
                setFavorited(res.data.favorited);
            }else{
                alert('좋아요 정보를 가져오는데 실패했습니다.');
            }
        })
    }, [])

    const onClickBtn = () => {
        if(favorited){
            axios.post('/api/favorite/removeFromFavorite', variables)
            .then(res => {
                if(res.data.success){
                    setFavoriteNumber(favoriteNumber - 1);
                    setFavorited(!favorited);
                }else{
                    alert('Favorite 리스트에서 지우는 걸 실패했습니다');
                }
            })
        }else{
            axios.post('/api/favorite/addToFavorite', variables)
            .then(res => {
                if(res.data.success){
                    setFavoriteNumber(favoriteNumber + 1);
                    setFavorited(!favorited);
                }else{
                    alert('Favorite 리스트에 추가를 실패했습니다');
                }
            })
        } 
    };

    return (
        <div style = {{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClickBtn}>{favorited ? "좋아요 취소" : "좋아요"} {favoriteNumber}</Button>
        </div>
    )
}

export default Favorite

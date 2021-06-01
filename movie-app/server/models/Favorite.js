const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    userFrom: {
        //Id 값을 가지고 ref로 선언된 스키마의 모든 값을 가져올 수 있는 타입
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type : String,
    },
    movieTitle: {
        type : String,
    },
    moviePost : {
        type : String,
    },
    movieRunTime : {
        type : String,
    }

}, { timestamps : true })

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }
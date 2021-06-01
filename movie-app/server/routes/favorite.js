const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

//좋아요 갯수 가져오기
router.post('/favoriteNumber', (req, res) => {
    Favorite.find({'movieId' :  req.body.movieId})
    .exec((err, info) => {
        if(err){
            return res.status(400).send(err);
        }
        return res.status(200).json({
            success : true,
            favoriteNumber : info.length
        })
    })
});

//내가 좋아요 누른 영화인지 가져오기
router.post('/favorited', (req, res) => {
    Favorite.find({'movieId' :  req.body.movieId, 'userFrom' : req.body.userFrom})
    .exec((err, info) => {
        if(err){
            return res.status(400).send(err);
        }
        let result = false;
        if(info.length !== 0){
            result = true
        }
        return res.status(200).json({
            success : true,
            favorited : result
        })
    })
});

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId : req.body.movieId, userFrom : req.body.userFrom})
    .exec((err, doc) => {
        if(err){
            return res.status(400).send(err);
        }
        return res.status(200).json({success : true, doc});
    })
});
router.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if(err){
            return res.status(400).send(err);
        }
        return res.status(200).json({success : true});
    })
});
router.post('/getFavoredMovie', (req, res) => {
    Favorite.find({ 'userFrom' : req.body.userFrom})
    .exec((err, favorites) => {
        if(err){
            return res.status(400).send(err);
        }
        return res.status(200).json({success : true, favorites})
    })
});

module.exports = router;

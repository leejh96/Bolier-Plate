const { User } = require("../models/User");

// //인증 처리
// let auth = (req, res, next) => {
//     //클라이언트 쿠키에서 토큰을 가져온다
//     //토큰을 복호화 한 후 user.id로 유저를 찾고 있으면 next 없으면 err
//     let token = req.cookies.x_auth;
//     User.findByToken(token, (err, user)=> {
//         if(err){
//             throw err;
//         }
//         if(!user){
//             return res.json({
//                 isAuth : false,
//                 error : true,
//             })
//         }
//         req.token = token;
//         req.user = user;
//         return next();
//     });
// };

//인증 처리
let auth = (req, res, next) => {
    //클라이언트 쿠키에서 토큰을 가져온다
    //토큰을 복호화 한 후 user.id로 유저를 찾고 있으면 next 없으면 err
    let token = req.cookies.x_auth;
    User.findByToken(token, (err, user)=> {
        if(err){
            throw err;
        }
        if(!user){
            return res.json({
                isAuth : false,
                error : true,
            })
        }
        req.token = token;
        req.user = user;
        return next();
    });
};
module.exports = { auth };
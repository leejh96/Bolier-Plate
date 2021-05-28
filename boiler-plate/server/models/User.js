const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50,
    },
    email : {
        type : String,
        trim : true, //공백제거
        unique : 1,
    },
    password : {
        type : String,
        minlength : 5,
    },
    role : {
        type : Number,
        default : 0,
    },
    image : String,
    token : {
        type :  String,
    },
    tokenExp : {
        type : Number,
    }
});

//user모델에 데이터를 저장하기 전에 콜백함수를 실행
//()=>{}는 this를 바인딩 하지 않는다. 따라서 console.log(user)를 해보면 빈값이다. 
// userSchema.pre('save', function(next){
//     //비밀번호 암호화 시키기
//     var user = this;
//     if(user.isModified('password')){
//         bcrypt.genSalt(saltRounds, (err, salt) => {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(user.password, salt, (err, hash) => {
//                 if(err){
//                     return next(err);
//                 }
//                 user.password = hash;
//                 return next();
//             });
//         })
//     }else{
//         next();
//     }
// });
userSchema.pre('save', async function(next){
    //비밀번호 암호화 시키기
    var user = this;
    try {
        if(user.isModified('password')){
            const salt = await bcrypt.genSalt(saltRounds)
            const hash = await bcrypt.hash(user.password, salt) 
            user.password = hash;
            return next();
        }else{
            next();
        }
    } catch (error) {
        return next(error)
    }

});
userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if(err){
            return cb(err);
        }
        cb(null, isMatch)
    })
};

userSchema.methods.generateToken = function(cb) {
    const user = this;
    //user._id + 'secretToken' => token
    //secretToken은 비밀키로 아무값이나 넣어도 상관없다.
    const token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function(err, user){
        if(err){
            return cb(err);
        }
        cb(null, user);
    })
};

// methods가 아닌 statics로 하는 이유는 methods는 this가 User를 가르키지만,
// statics에서는 this가 mongoose를 가르키기 때문에 findOne 함수를
// 사용하기 위해서는 mongoose를 가르켜야 하기 때문이다.
// userSchema.statics.findByToken = function(token, cb){
//     const user = this;
//     //토큰을 decode 함
//     //(토큰, 비밀키, 콜백)
//     jwt.verify(token, 'secretToken', (err, decoded)=> {
//         //user._id를 이용해서 유저를 찾고 확인
//         user.findOne({
//             _id : decoded,
//             token,
//         }, (err, user) => {
//             if(err){
//                 return cb(err);
//             }
//             cb(null, user);
//         })
//     });
// };

userSchema.statics.findByToken = async function(token, cb){
    try {
        const user = this;
        //토큰을 decode 함
        //(토큰, 비밀키, 콜백)
        const decoded = await jwt.verify(token, 'secretToken');
        const findUser = await user.findOne({
            _id : decoded,
            token,
        });
        return cb(null, findUser);
    } catch (error) {
        return cb(error);
    }
};

const User = mongoose.model('User', userSchema);
module.exports = { User };
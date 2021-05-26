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
    //
    const token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function(err, user){
        if(err){
            return cb(err);
        }
        cb(null, user);
    })
}

const User = mongoose.model('User', userSchema);
module.exports = { User };
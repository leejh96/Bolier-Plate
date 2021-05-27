const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const { User } =  require('./models/User');
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(() => {
    console.log('mongoDB connecting...')
})
.catch((error) => {
    console.error(error)
})
app.get('/', (req, res) => {
    res.send('hello world~~!');
});

// app.post('/api/user/register', (req, res) => {
//     const user = new User(req.body);
//     user.save((err) => {
//         if(err){
//             return res.json({
//                 success : false,
//                 error : err
//             })
//         }
//         return res.status(200).json({
//             success : true,
//         })
//     })
// });
app.post('/api/user/register', async (req, res) => {
    try {
        const user = await new User(req.body);
        await user.save()
        return res.status(200).json({
            success : true,
        });
    } catch (error) {
        return res.json({
            success : false,
            error,
        })    
    }
});
app.post('/api/user/login', (req, res) => {
    User.findOne({
        email : req.body.email
    }, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess : false,
                message : '해당하는 유저가 없습니다.'
            })
        }
        user.comparePassword(req.body.password, ( err, isMatch ) => {
            if(!isMatch){
                return res.json({
                    loginSuccess : false,
                    message : '비밀번호가 틀렸습니다.',
                })
            }
            user.generateToken((err, user) => {
                if(err){
                    return res.status(400).send(err);
                }
                //쿠키의 이름이 x_auth
                res.cookie('x_auth', user.token).status(200).json({
                    loginSuccess : true,
                    userId: user._id,
                })
            })
        });
    });
});

//role 0 -> 일반유저 role 0이 아니면 관리자
app.get('/api/user/auth', auth, (req, res) => {
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        role : req.user.role
    })
});
app.get('/api/user/logout', auth, (req, res)=>{
    User.findOneAndUpdate(
        { _id : req.user._id},
        {token : ""},
        (err, user)=>{
        if(err){
            return res.json({
                success : false,
                err,
            });
        }
        return res.status(200).json({
            success : true,
        });
    })
});

app.listen(port, () => {
    console.log(`${port}포트 서버가 실행중입니다.`)
})
const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const { User } =  require('./models/User');
const config = require('./config/key');
const cookieParser = require('cookie-parser');


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

// app.post('/register', (req, res) => {
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
app.post('/register', async (req, res) => {
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
app.post('/login', (req, res) => {
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
                res.cookie('x_auth', user.token).status(200).json({
                    loginSuccess : true,
                    userId: user._id,
                })
            })
        });
    });
});
app.listen(port, () => {
    console.log(`${port}포트 서버가 실행중입니다.`)
})
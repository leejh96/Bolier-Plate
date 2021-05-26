const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://keke1933:qwe123@boilerplate.heugz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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
})

app.listen(port, () => {
    console.log(`${port}포트 서버가 실행중입니다.`)
})
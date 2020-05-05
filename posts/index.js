const port = 4000;
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res)=> {
    res.status(200).send(posts);
});
app.post('/posts', (req, res)=> {

    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id,
        title
    };
    res.status(201).send( posts[id] );

});



app.use((err, req, res, next) =>{
    console.log('Posts Error:', err);
})

app.listen(port, () => {
    console.log('/*/Posts Service/*/....Listening on',port);
});
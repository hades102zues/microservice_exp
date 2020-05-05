const port = 4001;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
    
    const id = req.params.id;
    
    res.status(200).send(commentsByPostId[id] || [] );
});


app.post('/posts/:id/comments', (req, res )=>{

    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const id = req.params.id;

    const comments = commentsByPostId[id] || [];
    comments.push({id: commentId, content});

    commentsByPostId[id] = comments;

    res.status(201).send(comments);
})


app.use((err, req, res, next)=>{
    console.log('Comments Error: ',err)
});

app.listen(port, ()=> {
    console.log('/*/Comments Service/*/.....Listening on', port);
})

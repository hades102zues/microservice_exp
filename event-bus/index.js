const port = 4005;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post('/events', (req, res) => {

    const event = req.body;
    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);

    res.send({status : 'OK'});
})



app.listen(port, () => {
    console.log('/*/Event Bus/*/......Listening on ',port);
});
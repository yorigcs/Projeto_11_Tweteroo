import express from 'express';
import cors from 'cors';
const PORT = 5000;
const server = express();
server.use([express.json(), cors()]);

const user = [];

const tweets = [];


const getLast10Tweets = () => {
    const last10Tweets = [];
    tweets.slice(-10).forEach( tweet=> {
        const image = user.find(user => user.username === tweet.username).avatar;
        last10Tweets.push({...tweet, avatar: image}); 
    })
    return last10Tweets;
};


server.get('/tweets', (req, res) => {
   

    res.send(getLast10Tweets());
});

server.post('/tweets', (req, res) => {
    tweets.push(req.body);
    res.send('OK');
});

server.post('/sign-up', (req, res) => {
    user.push(req.body);
    res.send('OK');
});





server.listen(5000, () => console.log('listening on port ' + PORT));
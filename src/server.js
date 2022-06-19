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
    const {username, tweet} = req.body;
    if(!username || !tweet) {
        res.status(400).send('Todos os campos são obrigatórios!')
        return;
    }
    tweets.push(req.body);
    res.status(201).send('OK');
});

server.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body;
    if(!username|| !avatar) {
        res.status(400).send('Todos os campos são obrigatórios!')
        return;
    }
    if(user.find(user=> user.username === username)) {
        res.status(400).send('Já há um usuário cadastrado com esse nome!')
        return;
    }
   
    user.push(req.body);
    res.status(201).send('OK');
});





server.listen(5000, () => console.log('listening on port ' + PORT));
import express from 'express';
import cors from 'cors';
import fs from 'fs';
const PORT = 5000;
const server = express();
server.use([express.json(), cors()]);

let database = JSON.parse(fs.readFileSync("dataBase.json", "utf-8"));

const getLastNTweets = (page) => {
    const tweets = [...database.tweets];
    const lastsTweets = [];

    let from = (page -1)*10;
    let to = from + 10;
    
    tweets.reverse().slice(from,to).forEach(tweet => {
        const image = database.user.find(user => user.username === tweet.username).avatar;
        lastsTweets.push({ ...tweet, avatar: image });
    })
    return JSON.stringify(lastsTweets);
};

server.get('/tweets', (req, res) => {
    const page = Number(req.query.page);
    if(isNaN(page) || page < 1) {
        res.status(400).send('Informe uma página válida!');
        return;
    }
    res.send(getLastNTweets(page));
});

server.get('/tweets/:username', (req, res) => {
    const userTweets = database.tweets.filter(tweet => tweet.username === req.params.username).map(tweet => {
        return { ...tweet, ...database.user.find(user => user.username === tweet.username) };
    });
    console.log(userTweets)
    res.send(userTweets);

});

server.post('/tweets', (req, res) => {
    const { tweet } = req.body;
    const username = req.header('User');
    if (!tweet || !username) {
        res.status(400).send('Todos os campos são obrigatórios!')
        return;
    }
    database.tweets.push({tweet, username});
    fs.writeFileSync("dataBase.json", JSON.stringify(database, null, 2));
    res.status(201).send('OK');
});

server.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;
    if (!username || !avatar) {
        res.status(400).send('Todos os campos são obrigatórios!')
        return;
    }
    // if (database.user.find(user => user.username === username)) {
    //     res.status(400).send('Já há um usuário cadastrado com esse nome!')
    //     return;
    // }

    database.user.push(req.body);
    fs.writeFileSync("dataBase.json", JSON.stringify(database, null, 2));
    res.status(201).send('OK');
});





server.listen(5000, () => console.log('listening on port ' + PORT));
import express, { application } from 'express';
import cors from 'cors';

const server = express();
const PORT = 5000;

server.use(cors());
server.use(express.json());

//armazenar em memória
const tweets = [];
const users =[];

//rota post sign-up
server.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    //verifica se os campos foram preenchidos:
    if(!username || !avatar){
        return res.status(400).send({ message: 'Todos os campos são obrigatórios!' });
    }

    //verifica se são strings
    const isInputString = (typeof username === 'string' && typeof avatar === 'string');
    if(!isInputString){
        return res.sendStatus(400);
    }

    //verifica se o usuário já existe ou não
    const userExists = users.find((user) => user.username === username);
    //caso exista, userExists vai ficar preenchido com o objeto daquele usuario

    //caso achamos um usuário existente, retorna um erro
    if(userExists){
        return res.status(400).send({ message: 'Usuário já existente!' });
    }

    users.push({ username, avatar });

    res.status(201).send({ message: 'OK' });
});

server.get('/tweets', (req, res)=> {
    //pra cada tweet, buscamos o avatar do usuário
    tweets.forEach((t) => {
        const { avatar } = users.find((user) => user.username === t.username);
        //atribuição
        t.avatar = avatar;
    })

    //separa apenas os últimos 10 tweets
    const lastTenTweets = tweets.slice(-10);

    //retorna os últimos 10 tweets
    res.send(lastTenTweets);

});

server.post('/tweets', (req, res) => {
    console.log(req.body);

    const username = req.headers.user;
    const { tweet } = req.body;

    //validação de preenchimento de campos
    if(!username || !tweet){
        return res.status(400).send({error:`Todos os campos são obrigatórios!`});
    }

    //validação de string
    const isInputString = (typeof tweet === 'string');
    if(!isInputString){
        return res.sendStatus(400);
    }

    const userExists = users.find((user) => user.username === username);

    if(userExists){
        tweets.push({username, tweet});

        console.log(tweets);
    
        return res.status(201).send({ message: 'OK' });
    }else{
        return res.status(401).send("UNAUTHORIZED");
    }
});

server.listen(PORT, () => console.log(`listening on port ${5000}`));

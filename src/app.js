import express from 'express';
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
        return res.status(400).send({ message: 'Todos os campos são obrigatórios!' })
    }

    //verifica se o usuário já existe ou não
    const userExists = users.find((user) => user.username === username);
    //caso exista, userExists vai ficar preenchido com o objeto daquele usuario

    //caso achamos um usuário existente, retorna um erro
    if(userExists){
        res.status(400).send({ message: 'Usuário já existente!' });
    }

    users.push({ username, avatar });

    res.status(201).send({ message: 'OK' });
})


import express from 'express';
import router from './routes/router.js';
import conectarBD from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const app = express();

conectarBD();

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

app.use('/', router);

const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';
app.listen(port, host, () => console.log('servidor funcionando correctamente'));

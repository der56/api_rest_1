import cookieParser from 'cookie-parser';	
import 'dotenv/config';
import './database/connectdb.js';
import express from "express";
import authRouter from './routes/auth.route.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);
app.use(express.static('public'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app ready on port ${PORT} 🤑🤑`));
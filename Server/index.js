import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import todorouter from './routes/alltodos.js';

dotenv.config();

const server = express();
server.use(cors())
server.use(express.json())
server.use('/todo', todorouter)


mongoose.connect(process.env.MONGOURL).then(() => {
    console.log("Connected to MongoDB"); // Log the number of routes in todorouter
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
})


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
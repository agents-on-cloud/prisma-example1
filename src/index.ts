const cors = require('cors');
const express = require('express');
import * as dotenv from 'dotenv';
import {authorRouter} from "./author/author.router";

dotenv.config();

if (!process.env.PORT) { // if the port is not set in the .env file then exit
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/authors', authorRouter);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
} );
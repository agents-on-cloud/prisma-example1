const cors = require('cors');
const express = require('express');
import * as dotenv from 'dotenv';
import {authorRouter} from "./routers/author.router";
import {bookRouter} from "./routers/book.router";
const swaggerUi = require('swagger-ui-express');
import {swaggerSpec} from "./utils/swagger";
dotenv.config();

if (!process.env.PORT) { // if the port is not set in the .env file then exit
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Serve the Swagger UI
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
} );
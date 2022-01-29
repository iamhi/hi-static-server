import path from 'path';
import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import HttpStatus from 'http-status-codes';

import errorHandlerMiddleware from '@middlewares/errorHandlerMiddleware';

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(
  cors({
    // origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1mb' }));

/* Static folders */
app.use('/public', express.static(path.join(__dirname, 'static')));
/* ************** */

app.get('/healthcheck', (req, res) => {
  res.status(HttpStatus.OK).json({ message: 'Im good' });
});

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);

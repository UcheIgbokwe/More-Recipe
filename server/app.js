import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes/index';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8080;
const router = express.Router();
routes(router);

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', router);

app.get('*', (request, response) => response.status(404).json({ message: 'Nothing to display' }));

app.listen(port);

export default app;
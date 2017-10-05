import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import http from 'http';
import router from './routes/index';


const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router(app);
app.all('*', (req, res) => {
  res.status(404)
    .send("The page you requested doesn't exist");
});
dotenv.config();
const port = (process.env.PORT || 8080);
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log('Server running on port', port);
});


export default app;


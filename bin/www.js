import dotenv from 'dotenv';
import http from 'http';
import app from '../app';

dotenv.config();
const port = (process.env.PORT || 8080);
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log('Server running on port', port);
});

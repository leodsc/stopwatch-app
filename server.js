import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/apis/server/routes.js';

const app = express();

const dirname = new URL('./dist', import.meta.url).pathname;
app.use(express.static(dirname));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.set('port', process.env.PORT || 3000);

app.use('/api', routes.signup); 

const server = app.listen(app.get('port'), () => {
  console.log('listening on port ', server.address().port);
});

import express from 'express';

const app = express();

const dirname = new URL('./dist', import.meta.url).pathname;
app.use(express.static(dirname));
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
  console.log('listening on port ', server.address().port);
});

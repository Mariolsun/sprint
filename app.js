require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const users = require('./routes/users.js');
const cards = require('./routes/cards.js');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/createUser');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('successful connection!');
  })
  .catch((err) => {
    console.log(`error connecting to mongodb: ${err.message}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', users);
app.use('/cards', cards);
app.use((req, res, next) => {
  console.log(`404 error in app.js`);
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use((err, req, res, next) => {
  console.log(`error controller: ${err}`);
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
});

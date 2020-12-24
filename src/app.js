import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import helmet from 'helmet';
import '@utils/proxy';

import indexRouter from './routes/index';

const app = express();

// 设置密钥
app.set('jwtTokenSecret', process.env.JWT_SECRET || '666');
app.set('jwtAdminTokenSecret', process.env.JWT_ADMIN_SECRET || '333');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders(res) {
    res.set('Access-Control-Allow-Origin', '*');
  },
}));

app.use('/api/v1/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404);
  res.send('This api does not exist!');
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (process.env.NODE_ENV === 'PROD') {
    res.send('something wrong!');
  } else {
    res.send(err.message);
  }
});

export default app;

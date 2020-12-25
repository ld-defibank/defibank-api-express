// /* eslint-disable no-console */
// require('dotenv').config();
import { db } from './db';
import start from './jobs';
import log from './utils/log';
import '@utils/proxy';

db.authenticate().then(() => {
  log('Connect Database.');
  start();
});

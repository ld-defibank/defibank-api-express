import log from '@utils/log';
import { db } from '.';
import importToken from './seed/token';

db.authenticate().then(() => {
  log('Connect Database.');

  Promise.all([
    importToken(),
  ]).then(() => {
    db.close();
  });
});

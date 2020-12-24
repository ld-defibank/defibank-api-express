import express from 'express';
import Wallet from 'ethereumjs-wallet';
import jsonResponse from '@middlewares/jsonResponse';
import log from '@utils/log';
import LendingPoolContract from '@contracts/lendingPool';

// const { Models, commonErrorHandler } = require('../db');
// const varsProvider = require('../middlewares/varsProvider');
// const jwtParser = require('../middlewares/jwtParser');

// const { Announcement, Deposit } = Models;

const router = express.Router();

/* GET home page. */
router.get('/t.json', (req, res, next) => {
  res.json_data = { test: 1 };
  next();
}, jsonResponse);

router.get('/t2.json', (req, res, next) => {
  const contract = new LendingPoolContract();
  contract.getReserveData('0xcDaA397060059E9AA2C3a6F7f544BB1Be7237a48').then((data) => {
    res.json_data = data;
    next();
  });
}, jsonResponse);

export default router;

import express from 'express';
import jsonResponse from '@middlewares/jsonResponse';
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

export default router;

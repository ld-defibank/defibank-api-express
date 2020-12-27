import express from 'express';
import jsonResponse from '@middlewares/jsonResponse';
import argsCheck from '@middlewares/argsCheck';
import { Models } from '@db/index';
import DB from '@const/DB';

const router = express.Router();
const { Reserve, Token } = Models;

/* GET home page. */
router.get('/reserve.json', argsCheck('token_address'), (req, res, next) => {
  const { filter, limit, token_address } = req.query;
  const where = {
    state: DB.RESERVE_STATE.IMPORTED,
  };
  if (filter === 'month') {
    where.hour = 0;
    where.date = 1;
  } else if (filter === 'week') {
    where.hour = 0;
    where.day = 0;
  } else if (filter === 'day') {
    where.hour = 0;
  }

  Token.findOne({
    where: {
      tokenAddress: token_address,
    },
  }).then((token) => {
    if (!token) {
      res.json_data = null;
      next();
      return;
    }
    const { id } = token;
    where.tokenId = id;
    Reserve.findAll({
      where,
      limit: parseInt(limit, 10) || 10,
      order: [
        ['id', 'DESC'],
      ],
    }).then((rows) => {
      res.json_data = {
        token: token.getData(),
        history: rows.map((row) => row.getData()),
      };
      next();
    });
  });

}, jsonResponse);

export default router;

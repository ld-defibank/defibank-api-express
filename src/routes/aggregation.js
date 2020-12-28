import express from 'express';
import jsonResponse from '@middlewares/jsonResponse';
import argsCheck from '@middlewares/argsCheck';
import { Models } from '@db/index';
import CONST from '@const/CONST';
import ERROR from '@const/ERROR';
import Decimal from 'decimal.js-light';

const router = express.Router();
const { Reserve, Token } = Models;

const {
  AGGREGATION_TARGET,
} = CONST;

const AGGREGATION_COMMAND = {
  avg(rows) {
    const { length } = rows;
    return rows.reduce((a, b) => a.add(b), new Decimal(0)).div(length).toString();
  },
};

router.get('/reserve.json', argsCheck('token_address', 'targets', 'command'), (req, res, next) => {
  const { targets, command, token_address, filter } = req.query;

  if (!(command in AGGREGATION_COMMAND)) {
    res.json_error = ERROR.AGGREGATION_COMMAND_NOT_FOUND;
    next();
    return;
  }

  const targetsArr = targets.split(',').map((target) => AGGREGATION_TARGET[target]).filter((target) => target);
  const limit = req.query.limit || 10;
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
    Reserve.findByFilter(filter, {
      where: {
        tokenId: id,
      },
      limit: parseInt(limit, 10),
    }).then((rows) => {
      const ret = {};
      targetsArr.forEach((target) => {
        ret[target] = AGGREGATION_COMMAND[command](rows.map((row) => row[target]));
      });
      res.json_data = ret;
      next();
    });
  });

  // const where = {
  //   state: DB.RESERVE_STATE.IMPORTED,
  // };
  // if (filter === 'month') {
  //   where.hour = 0;
  //   where.date = 1;
  // } else if (filter === 'week') {
  //   where.hour = 0;
  //   where.day = 0;
  // } else if (filter === 'day') {
  //   where.hour = 0;
  // }

  // Token.findOne({
  //   where: {
  //     tokenAddress: token_address,
  //   },
  // }).then((token) => {
  //   if (!token) {
  //     res.json_data = null;
  //     next();
  //     return;
  //   }
  //   const { id } = token;
  //   where.tokenId = id;
  //   Reserve.findAll({
  //     where,
  //     limit: parseInt(limit, 10) || 10,
  //     order: [
  //       ['id', 'DESC'],
  //     ],
  //   }).then((rows) => {
  //     res.json_data = {
  //       token: token.getData(),
  //       history: rows.map((row) => row.getData()),
  //     };
  //     next();
  //   });
  // });
}, jsonResponse);

export default router;

import express from 'express';
import jsonResponse from '@middlewares/jsonResponse';
import argsCheck from '@middlewares/argsCheck';
import { Models } from '@db/index';

const router = express.Router();
const { Reserve, Token } = Models;

router.get('/reserve.json', argsCheck('token_address'), (req, res, next) => {
  const { filter, limit, token_address } = req.query;
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
      limit: parseInt(limit, 10) || 10,
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

import { Models } from '@db/index';

const TOKENS = JSON.parse(process.env.TOKENS);

const {
  Token,
} = Models;

export default function () {
  return Promise.all(
    Object.values(TOKENS).map((TOKEN) => Token.findOrCreate({
      where: { tokenAddress: TOKEN.tokenAddress },
      defaults: TOKEN,
    }).then(([instance, created]) => {
      console.log(`${TOKEN.symbol} ${created ? 'imported' : 'find, ignore'}`);
      return instance;
    })),
  );
}

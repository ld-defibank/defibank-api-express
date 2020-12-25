import { Models } from '@db/index';

const TOKENS = JSON.parse(process.env.TOKENS);

const { Reserve } = Models;

// 确认2次
export default [{
  fireAt: '0 1 * * * *',
  excute() {
    Object.values(TOKENS).forEach((TOKEN) => {
      Reserve.fetch(TOKEN.tokenAddress);
    });
  },
}, {
  fireAt: '0 3 * * * *',
  excute() {
    Object.values(TOKENS).forEach((TOKEN) => {
      Reserve.fetch(TOKEN.tokenAddress);
    });
  },
}, {
  fireAt: '0 5 * * * *',
  excute() {
    Object.values(TOKENS).forEach((TOKEN) => {
      Reserve.fetch(TOKEN.tokenAddress);
    });
  },
}];

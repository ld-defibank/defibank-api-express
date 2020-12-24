import log from '@utils/log';
import { Models } from '@db/index';
// import DB from '@const/DB.json';
import Sequelize from 'sequelize';

const TOKENS = JSON.parse(process.env.TOKENS);

function getTag(timestamp, token) {
  const hours = parseInt(timestamp / 1000 / 60 / 60, 10);
  return `RD_${token}_${hours}`;
}

export default [{
  fireAt: '* * * * * *',
  excute(fireDate) {
    Object.values(TOKENS).forEach((TOKEN) => {
      const now = new Date();
      const tag = getTag(now.getTime(), TOKEN.symbol);
      const hourTag = now.getUTCHours();

      console.log(tag, hourTag);
    });
    // const taskTag = 'state_mission_progressing';
    // const now = new Date();

    // Mission.update({
    //   state: DB.MISSION_STATE.progressing,
    // }, {
    //   where: {
    //     startAt: {
    //       [Op.lte]: now,
    //     },
    //     endAt: {
    //       [Op.gte]: now,
    //     },
    //   },
    // }).then(() => {
    //   log(taskTag, 'finish');
    // });
  },
}];

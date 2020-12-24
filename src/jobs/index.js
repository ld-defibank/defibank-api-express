import schedule from 'node-schedule';
import reserveDataTasks from './reserveData';

export default function start() {
  const tasks = [].concat(reserveDataTasks);
  tasks.forEach((task) => {
    schedule.scheduleJob(task.fireAt, task.excute);
  });
}

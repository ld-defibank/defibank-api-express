import thevar from './var';

const Models = {};

function model(sequelize) {
  Models.Var = thevar(sequelize);

  // 关系

  return Models;
}

export default model;

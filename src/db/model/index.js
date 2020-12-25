import thevar from './var';
import token from './tokens';
import reserve from './reserve';

const Models = {};

function model(sequelize) {
  Models.Var = thevar(sequelize);
  Models.Token = token(sequelize);
  Models.Reserve = reserve(sequelize);

  // 关系
  Models.Reserve.belongsTo(Models.Token, { foreignKey: 'tokenId', sourceKey: 'id', as: 'token' });

  return Models;
}

export default model;

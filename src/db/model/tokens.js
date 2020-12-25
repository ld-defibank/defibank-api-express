/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import Sequelize from 'sequelize';

const { Model, Op } = Sequelize;

class Token extends Model {
  getData() {
    const ret = {
      tokenAddress: this.tokenAddress,
      name: this.name,
      symbol: this.symbol,
      decimals: this.decimals,
    };
    return ret;
  }
}

function model(sequelize) {
  Token.init({
    tokenAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    symbol: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    decimals: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'token',
  });
  return Token;
}

export default model;

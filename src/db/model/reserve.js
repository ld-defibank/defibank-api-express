/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import Sequelize from 'sequelize';
import DB from '@const/DB';
import LendingPoolContract from '@contracts/lendingPool';

const {
  RESERVE_STATE,
} = DB;

const { Model, Op } = Sequelize;

class Reserve extends Model {
  static getTag(symbol, timestamp = new Date().getTime()) {
    const hours = parseInt(timestamp / 1000 / 60 / 60, 10);
    return `RD_${symbol}_${hours}`;
  }

  static fetch(tokenAddress) {
    const Token = Reserve.sequelize.model('token');
    const timestamp = new Date();
    const hour = timestamp.getUTCHours();
    const day = timestamp.getUTCDay();
    const date = timestamp.getUTCDate();

    return Token.findOne({
      where: { tokenAddress },
    }).then((token) => {
      if (!token) return [null, null];
      const tokenId = token.id;
      const tag = Reserve.getTag(token.symbol, timestamp.getTime());

      return Reserve.findOrCreate({
        where: { tag },
        defaults: {
          tokenId,
          tag,
          hour,
          date,
          day,
          timestamp,
        },
      }).then(([reserve]) => [reserve, token]);
    }).then(([reserve, token]) => {
      const contract = new LendingPoolContract();

      if (reserve.state === RESERVE_STATE.IMPORTED) {
        return reserve;
      }

      return Promise.all([
        contract.getReserveData(token.tokenAddress),
        contract.getReserveConfigurationData(token.tokenAddress),
      ]).then(([reserveData, reserveConfig]) => {
        const {
          totalLiquidity,
          availableLiquidity,
          totalBorrowsStable,
          totalBorrowsVariable,
          liquidityRate,
          variableBorrowRate,
          stableBorrowRate,
          averageStableBorrowRate,
          utilizationRate,
          liquidityIndex,
          variableBorrowIndex,
          aTokenAddress,
          lastUpdateTimestamp,
        } = reserveData;
        const {
          ltv,
          liquidationThreshold,
          liquidationBonus,
          interestRateStrategyAddress,
          usageAsCollateralEnabled,
          borrowingEnabled,
          stableBorrowRateEnabled,
          isActive,
        } = reserveConfig;

        return reserve.update({
          state: RESERVE_STATE.IMPORTED,
          timestamp,
          hour,
          day,
          date,
          // ReserveData
          totalLiquidity,
          availableLiquidity,
          totalBorrowsStable,
          totalBorrowsVariable,
          liquidityRate,
          variableBorrowRate,
          stableBorrowRate,
          averageStableBorrowRate,
          utilizationRate,
          liquidityIndex,
          variableBorrowIndex,
          aTokenAddress,
          lastUpdateTimestamp,
          // ReserveConfigurationData
          ltv,
          liquidationThreshold,
          liquidationBonus,
          interestRateStrategyAddress,
          usageAsCollateralEnabled,
          borrowingEnabled,
          stableBorrowRateEnabled,
          isActive,
        });
      });
    });
  }

  getData() {
    const ret = {
      id: this.id,
      tag: this.tag,
      hour: this.hour,
      day: this.day,
      date: this.date,
      timestamp: this.timestamp,
      tokenId: this.tokenId,
      state: this.state,
      totalLiquidity: this.totalLiquidity,
      availableLiquidity: this.availableLiquidity,
      totalBorrowsStable: this.totalBorrowsStable,
      totalBorrowsVariable: this.totalBorrowsVariable,
      liquidityRate: this.liquidityRate,
      variableBorrowRate: this.variableBorrowRate,
      stableBorrowRate: this.stableBorrowRate,
      averageStableBorrowRate: this.averageStableBorrowRate,
      utilizationRate: this.utilizationRate,
      liquidityIndex: this.liquidityIndex,
      variableBorrowIndex: this.variableBorrowIndex,
      aTokenAddress: this.aTokenAddress,
      lastUpdateTimestamp: this.lastUpdateTimestamp,
      ltv: this.ltv,
      liquidationThreshold: this.liquidationThreshold,
      liquidationBonus: this.liquidationBonus,
      interestRateStrategyAddress: this.interestRateStrategyAddress,
      usageAsCollateralEnabled: this.usageAsCollateralEnabled,
      borrowingEnabled: this.borrowingEnabled,
      stableBorrowRateEnabled: this.stableBorrowRateEnabled,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
    return ret;
  }
}

function model(sequelize) {
  Reserve.init({
    tag: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    hour: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    day: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    timestamp: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    tokenId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    state: {
      type: Sequelize.ENUM(Object.values(RESERVE_STATE)),
      allowNull: false,
      defaultValue: RESERVE_STATE.CREATED,
    },

    // ReserveData
    totalLiquidity: {
      type: Sequelize.STRING,
    },
    availableLiquidity: {
      type: Sequelize.STRING,
    },
    totalBorrowsStable: {
      type: Sequelize.STRING,
    },
    totalBorrowsVariable: {
      type: Sequelize.STRING,
    },
    liquidityRate: {
      type: Sequelize.STRING,
    },
    variableBorrowRate: {
      type: Sequelize.STRING,
    },
    stableBorrowRate: {
      type: Sequelize.STRING,
    },
    averageStableBorrowRate: {
      type: Sequelize.STRING,
    },
    utilizationRate: {
      type: Sequelize.STRING,
    },
    liquidityIndex: {
      type: Sequelize.STRING,
    },
    variableBorrowIndex: {
      type: Sequelize.STRING,
    },
    aTokenAddress: {
      type: Sequelize.STRING,
    },
    lastUpdateTimestamp: {
      type: Sequelize.STRING,
    },

    // ReserveConfigurationData
    ltv: {
      type: Sequelize.STRING,
    },
    liquidationThreshold: {
      type: Sequelize.STRING,
    },
    liquidationBonus: {
      type: Sequelize.STRING,
    },
    interestRateStrategyAddress: {
      type: Sequelize.STRING,
    },
    usageAsCollateralEnabled: {
      type: Sequelize.BOOLEAN,
    },
    borrowingEnabled: {
      type: Sequelize.BOOLEAN,
    },
    stableBorrowRateEnabled: {
      type: Sequelize.BOOLEAN,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'reserve',
  });
  return Reserve;
}

export default model;

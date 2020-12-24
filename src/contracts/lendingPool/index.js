/* eslint-disable prefer-promise-reject-errors */
import web3 from '@utils/web3';
import ABI from './abi.json';
import Contract from '../base';

const {
  ADDRESS_LENDING_POOL,
} = process.env;

export default class LendingPoolContract extends Contract {
  constructor() {
    super(web3, ABI, ADDRESS_LENDING_POOL);
  }

  getReserveData(tokenAddress) {
    return this.call('getReserveData', [tokenAddress]);
  }

  getReserveConfigurationData(tokenAddress) {
    return this.call('getReserveConfigurationData', [tokenAddress]);
  }

  getUserAccountData(userAddress) {
    return this.call('getUserAccountData', [userAddress]);
  }

  getUserReserveData(tokenAddress, userAddress) {
    return this.call('getUserReserveData', [tokenAddress, userAddress]);
  }
}

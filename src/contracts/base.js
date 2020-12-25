import { toChecksumAddress } from 'ethereum-checksum-address';
import ERC20_ABI from './erc20_abi.json';

const MAX_VAL = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export default class Contract {
  constructor(web3, ABI, address, enableLog = false) {
    this.ABI = ABI;
    this.address = address;
    this.contract = new web3.eth.Contract(ABI, toChecksumAddress(address));
    this.enableLog = enableLog;
  }

  log(event, method, extraData = {}) {
    if (!this.enableLog) return;
    console.groupCollapsed(`合约调用 - ${event} - ${method}`);
    console.table({
      合约地址: { value: this.address },
      调用方法: { value: method },
      ...extraData,
    });
    console.groupEnd();
  }

  call(method, args = []) {
    return this.contract.methods[method](...args).call().then((data) => {
      this.log('call', method, {
        方法入参: { value: args },
        结果: { value: data },
      });
      return data;
    });
  }

  send(method, args = [], options = {}) {
    return this.estimateGas(method, args, { ...options })
      .then((gas) => this.contract.methods[method](...args).send({
        gas,
        ...options,
      }))
      .then((data) => {
        this.log('send', method, {
          方法入参: { value: args },
          调用参数: { value: options },
          结果: { value: data },
        });
        return data;
      });
  }

  estimateGas(method, args = [], options = {}) {
    return this.contract.methods[method](...args).estimateGas(options)
      // gas多一点防止出问题
      .then((gas) => {
        this.log('estimateGas', method, {
          方法入参: { value: args },
          调用参数: { value: options },
          预测gas: { value: gas },
          调整gas: { value: parseInt(gas * 1.05, 10) },
        });
        return parseInt(gas * 1.05, 10);
      });
  }

  getPastEvents(eventName, filter) {
    return this.contract.getPastEvents(eventName, filter).then((data) => {
      this.log('getPastEvents', eventName, {
        过滤: { value: filter },
        结果: { value: data },
      });
      return data;
    });
  }
}

export class Erc20Contract extends Contract {
  constructor(web3, address, ABI = ERC20_ABI) {
    super(web3, ABI, address);
  }

  balanceOf(account) {
    return this.call('balanceOf', [account]);
  }

  allowance(account, tokenAddress) {
    return this.call('allowance', [account, toChecksumAddress(tokenAddress)]);
  }

  approve(account, tokenAddress) {
    return this.send('approve', [toChecksumAddress(tokenAddress), MAX_VAL], {
      from: account,
    });
  }
}

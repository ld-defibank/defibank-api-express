import Web3 from 'web3';

const {
  INFURA_KEY,
} = process.env;

const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/${INFURA_KEY}`));

export default web3;

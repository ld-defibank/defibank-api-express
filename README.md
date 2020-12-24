# defibank 公共API

本项目提供defibank的公共数据缓存服务。

## 配置

```json
{
  "NODE_ENV": "环境, DEV|PROD",
  "PORT": "服务端口",
  "DB_HOST": "数据库地址",
  "DB_NAME": "数据库名",
  "DB_USER": "数据库用户名",
  "DB_PASS": "数据库密码",
  "COOKIE_SECRET": "cookie密钥",
  "COOKIE_PREFIX": "cookie前缀",
  "INFURA_KEY": "INFURA project id",

  "ADDRESS_CHAINLINK_PROXY_PRICE_PROVIDER": "",
  "ADDRESS_LENDING_POOL": "",
  "ADDRESS_LENDING_POOL_CORE": "",
  "ADDRESS_LENDING_POOL_DATA_PROVIDER": "",

  "TOKENS": {
    "USDT": {
      "tokenAddress": "",
      "name": "Tether USD",
      "symbol": "USDT",
      "decimals": 6
    },
    "ETH": {
      "tokenAddress": "",
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    }
  },
  "ETH_EXPORER_URL": "https://rinkeby.etherscan.io/"
}
```

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

## API

### Reserve历史

此接口定期记录`LendingPool`合约的`getReserveData`和`getReserveConfigurationData`方法返回。并提供按年月日等分析。

```
GET /api/v1/history/reserve.json
```

入参

```
?token_address=0x&filter=&limit=
```

| 参数 | 必填 | 默认值 | 解释 |
| - | - | - | - |
| token_address | 是 | - | 币种地址 |
| filter | 否 | hour | 维度，month,week,day,hour |
| limit | 否 | 10 | 返回条数 |

返回

```
200
```
```
{
  "success": true,
  "data": {
    "token": {
      ...
    },
    "history": [{
      ...
    }]
  }
}
```

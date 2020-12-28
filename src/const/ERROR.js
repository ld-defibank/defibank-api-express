const ERROR = {
  ARGS_NEEDED: {
    code: 500,
    message: '参数不足',
  },
  PASSWORD_FAIL: {
    code: 501,
    message: '密码错误',
  },
  COMMON: {
    code: 502,
    message: '业务出错，请稍后再试',
  },
  AGGREGATION_TARGET_NOT_FOUND: {
    code: 601,
    message: '聚合指标未找到',
  },
  AGGREGATION_COMMAND_NOT_FOUND: {
    code: 602,
    message: '聚合指令未找到',
  },
};

export default ERROR;

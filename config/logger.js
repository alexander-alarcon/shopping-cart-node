var winstonLogger = require('winston');

require('winston-loggly-bulk');

winstonLogger.configure({
  transports: [
    new winstonLogger.transports.File({ 
      filename: 'myLogs.log',
    })
  ]
});

winstonLogger.add(winstonLogger.transports.Loggly, {
    token: "767a41ed-d35f-4596-85ea-68bd3068e710",
    subdomain: "waa994",
    tags: ["Winston-NodeJS"],
    json:true
});

module.exports = winstonLogger;
const morgan = require("morgan");
const logger = require("../config/logger");

const morganLogger = morgan("combined", {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
});

module.exports = morganLogger;

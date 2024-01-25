const chalk = require("chalk");
const info = (args) => {
  console.log(
    chalk.blue(`[${new Date().toLocaleString()}] [INFO]`),
    typeof args === "string" ? chalk.blueBright(args) : args
  );
};
const error_s = (args) => {
  console.log(
    chalk.red(`[${new Date().toLocaleString()}] [ERROR]`),
    typeof args === "string" ? chalk.redBright(args) : args
  );
};

const warn = (args) => {
  console.log(
    chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`),
    typeof args === "string" ? chalk.yellowBright(args) : args
  );
};

module.exports = {
  info,
  warn,
  error_s,
};

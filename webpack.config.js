const dev = require("./webpack/dev.config.js");
const prod = require("./webpack/prod.config.js");

module.exports = function(env) {
  return env.development ? dev(env) : prod(env);
};

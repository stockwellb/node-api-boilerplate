require('pkginfo')(module, 'name');
const application = module.exports.name;
const debug = require('debug');

module.exports = (zone = 'general') => {
  const module = {
    info: debug(`${application}:${zone}:info`),
    log: debug(`${application}:${zone}:log`),
    trace: debug(`${application}:${zone}:trace`),
    warn: debug(`${application}:${zone}:warn`),
    debug: debug(`${application}:${zone}:debug`)
  };

  return module;
};

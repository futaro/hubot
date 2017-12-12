'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WordModel = exports.SourceModel = exports.sequelize = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sequelize = new _sequelize2.default(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: 'mysql',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
}),
      WordModel = sequelize.define('words', {
  first_word: _sequelize2.default.STRING,
  second_word: _sequelize2.default.STRING,
  point: _sequelize2.default.INTEGER
}),
      SourceModel = sequelize.define('sources', {
  type: _sequelize2.default.STRING,
  uid: _sequelize2.default.STRING,
  source: _sequelize2.default.TEXT,
  parsed: _sequelize2.default.INTEGER
}, {
  getterMethods: {
    message() {

      let msg;

      if (this.type === 'twitter') {
        let parsed_data = JSON.parse(this.source);

        msg = parsed_data.retweeted_status ? parsed_data.retweeted_status.text : parsed_data.text;
      } else {
        msg = this.source;
      }

      return msg.replace(/\@[a-z0-9\_\.\-]+/i, '') // remove @screen_name
      .replace(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/i, ''); // remove URL
    }
  }
});

(async () => {
  await sequelize.sync();
})();

exports.sequelize = sequelize;
exports.SourceModel = SourceModel;
exports.WordModel = WordModel;
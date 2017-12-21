'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collect_service = require('./services/collect_service');

var _collect_service2 = _interopRequireDefault(_collect_service);

var _collect_ha_chu_service = require('./services/collect_ha_chu_service');

var _collect_ha_chu_service2 = _interopRequireDefault(_collect_ha_chu_service);

var _parse_service = require('./services/parse_service');

var _parse_service2 = _interopRequireDefault(_parse_service);

var _speak_service = require('./services/speak_service');

var _speak_service2 = _interopRequireDefault(_speak_service);

var _learn_service = require('./services/learn_service');

var _learn_service2 = _interopRequireDefault(_learn_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Pipo class
 */
class Pipo {

  /**
   * constructor
   */
  constructor() {}

  /**
   *
   * @param {Function} callback
   */
  collect(callback) {

    const service = new _collect_service2.default();
    service.collect(callback);
  }

  collect_users(options, callback) {

    const service = new _collect_ha_chu_service2.default();
    service.collect(options, callback);
  }

  /**
   *
   * @param {Function} callback
   */
  parse(callback) {

    const service = new _parse_service2.default();
    service.parse(callback);
  }

  /**
   *
   * @param {Function} callback
   */
  speak(callback) {

    const service = new _speak_service2.default();
    service.speakRandom(callback);
  }

  /**
   *
   * @param {string} type
   * @param {string} uid
   * @param {string} message
   * @param {Function} callback
   */
  learn(type, uid, message, callback) {

    const service = new _learn_service2.default();
    service.learn(type, uid, message, callback);
  }
}

exports.default = Pipo;

module.exports = Pipo;
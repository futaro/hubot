'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collect_service = require('./services/collect_service');

var _collect_service2 = _interopRequireDefault(_collect_service);

var _parse_service = require('./services/parse_service');

var _parse_service2 = _interopRequireDefault(_parse_service);

var _speak_service = require('./services/speak_service');

var _speak_service2 = _interopRequireDefault(_speak_service);

var _learn_service = require('./services/learn_service');

var _learn_service2 = _interopRequireDefault(_learn_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Pipo {

  constructor() {}

  collect(callback) {

    const service = new _collect_service2.default();
    service.collect(callback);
  }

  parse(callback) {

    const service = new _parse_service2.default();
    service.parse(callback);
  }

  speak(callback) {

    const service = new _speak_service2.default();
    service.speakRandom(callback);
  }

  learn(type, uid, message, callback) {

    const service = new _learn_service2.default();
    service.learn(type, uid, message, callback);
  }
}

exports.default = Pipo;

module.exports = Pipo;
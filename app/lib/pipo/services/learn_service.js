'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mecabAsync = require('mecab-async');

var _mecabAsync2 = _interopRequireDefault(_mecabAsync);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LearnService {

  constructor() {
    this.mecab = new _mecabAsync2.default();
  }

  learn(type, uid, message, callback) {
    (async () => {

      await _models.SourceModel.build({
        type: type,
        uid: uid,
        source: message,
        parsed: 0
      }).save();

      callback();
    })().catch(err => {
      console.error(err);
      process.exit(1);
    });
  }

  learnAsync(type, uid, message) {
    return new Promise((resolve, reject) => {
      _models.SourceModel.build({
        type: type,
        uid: uid,
        source: message,
        parsed: 0
      }).save().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }
}
exports.default = LearnService;
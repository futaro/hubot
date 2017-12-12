'use strict';

var _index = require('../pipo/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const p = new _index2.default();

p.collect(() => {
  process.exit(0);
});

// p.parse(() => {
//   process.exit(0)
// })

// p.speak((message) => {
//   console.log(message)
//   process.exit(0)
// })

// p.learn('dev', 1, 'こんにちは。', ()=>{
//   process.exit(0)
// })
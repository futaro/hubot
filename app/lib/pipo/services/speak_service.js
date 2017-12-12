'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

class SpeakService {

  constructor() {}

  speakRandom(callback) {
    (async () => {

      let message = await this.getRandomWord(['__BEGIN__']);

      message.pop();
      message.shift();

      callback(message.join(''));
    })().catch(err => {
      console.error(err);
      process.exit(1);
    });
  }

  async getRandomWord(stack_words) {

    let last_word = stack_words[stack_words.length - 1];

    if (last_word === '__END__') {
      return stack_words;
    }

    let words = await _models.WordModel.findAll({ where: { first_word: last_word } });
    let weighting_words = [],
        i,
        j,
        w;
    for (i = 0; i < words.length; i++) {
      w = words[i];
      for (j = 0; j < w.point; j++) {
        weighting_words.push(w);
      }
    }

    let word = weighting_words[Math.floor(Math.random() * weighting_words.length)];

    stack_words.push(word.second_word);

    return await this.getRandomWord(stack_words);
  }
}
exports.default = SpeakService;
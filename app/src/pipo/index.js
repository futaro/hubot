'use strict'

import CollectService from './services/collect_service'
import ParseService from './services/parse_service'
import SpeakService from './services/speak_service'
import LearnService from './services/learn_service'

class Pipo {

  constructor() {
  }

  collect(callback) {

    const service = new CollectService()
    service.collect(callback)
  }

  parse(callback) {

    const service = new ParseService()
    service.parse(callback)
  }

  speak(callback) {

    const service = new SpeakService()
    service.speakRandom(callback)
  }

  learn(type, uid, message, callback) {

    const service = new LearnService()
    service.learn(type, uid, message, callback)
  }
}

export default Pipo
module.exports = Pipo

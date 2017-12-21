'use strict'

import CollectService from './services/collect_service'
import CollectHachuService from './services/collect_ha_chu_service'
import ParseService from './services/parse_service'
import SpeakService from './services/speak_service'
import LearnService from './services/learn_service'

/**
 * Pipo class
 */
class Pipo {

  /**
   * constructor
   */
  constructor() {
  }

  /**
   *
   * @param {Function} callback
   */
  collect(callback) {

    const service = new CollectService()
    service.collect(callback)
  }

  collect_users(options, callback) {

    const service = new CollectHachuService()
    service.collect(options, callback)
  }

  /**
   *
   * @param {Function} callback
   */
  parse(callback) {

    const service = new ParseService()
    service.parse(callback)
  }

  /**
   *
   * @param {Function} callback
   */
  speak(callback) {

    const service = new SpeakService()
    service.speakRandom(callback)
  }

  /**
   *
   * @param {string} type
   * @param {string} uid
   * @param {string} message
   * @param {Function} callback
   */
  learn(type, uid, message, callback) {

    const service = new LearnService()
    service.learn(type, uid, message, callback)
  }
}

export default Pipo
module.exports = Pipo

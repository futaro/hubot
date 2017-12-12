import Mecab from 'mecab-async'
import { SourceModel } from '../models'

export default class LearnService {

  constructor() {
    this.mecab = new Mecab()
  }

  learn(type, uid, message, callback) {
    (async () => {

      await SourceModel
        .build({
          type  : type,
          uid   : uid,
          source: message,
          parsed: 0
        })
        .save()

      callback()

    })().catch(err => {
      console.error(err)
      process.exit(1)
    })
  }

  learnAsync(type, uid, message) {
    return new Promise((resolve, reject) => {
      SourceModel
        .build({
          type  : type,
          uid   : uid,
          source: message,
          parsed: 0
        })
        .save()
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

import Mecab from 'mecab-async'
import { SourceModel, WordModel } from '../models'

export default class ParseService {

  constructor() {
    this.mecab = new Mecab()
  }

  parse(callback, limit = 1000) {
    (async () => {

      let sources = await SourceModel.findAll({where: {parsed: 0}, limit: limit})

      let i, j, source, words, word_instance

      for (i = 0; i < sources.length; i++) {
        source = sources[i]
        words = await this.wakachi(source.message)
        words = this.formatWordList(words)

        for (j = 0; j < words.length - 1; j++) {

          word_instance = await WordModel.findOne({
            where: {
              first_word : words[j],
              second_word: words[j + 1]
            }
          })

          if (word_instance) {
            word_instance.point++
          } else {
            word_instance = WordModel.build({
              first_word : words[j],
              second_word: words[j + 1],
              point      : 1
            })
          }

          await word_instance.save()
        }

        source.parsed = 1
        await source.save()
      }

      callback()

    })().catch(err => {
      console.error(err)
      process.exit(1)
    })
  }

  wakachi(message) {
    return new Promise((resolve, reject) => {
      this.mecab.parse(message, (err, result) => {
        return (err) ? reject(err) : resolve(result)
      })
    })
  }

  formatWordList(words) {

    words = words.map((words) => {
      return words[0] === 'EOS' ? '__END__' : words[0]
    })

    if (words.length === 0) {
      return []
    }

    words.unshift('__BEGIN__')
    words.push('__END__')

    return words
  }


}

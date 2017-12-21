import Twitter from 'node-twitter'
import LearnService from './learn_service'
import { SourceModel } from '../models'

export default class CollectService {

  constructor() {
    this.twitter_client = new Twitter.RestClient(
      process.env.TW_CONSUMER_KEY,
      process.env.TW_CONSUMER_SECRET,
      process.env.TW_ACCESS_TOKEN_KEY,
      process.env.TW_ACCESS_TOKEN_SECRET
    )
  }

  collect(options, callback) {

    (async () => {

      let latest_source = await SourceModel.findOne({where: {type: 'twitter'}, order:[['id', 'DESC']], limit: 1})
      if (latest_source) {
        let last_tweet = JSON.parse(latest_source.source)
        options.max_id = last_tweet.id
      }

      const learn_service = new LearnService()

      let tweets = await this.getTweetsAsync(options)

      let i, tw, source, saved_count = 0
      for (i = 0; i < tweets.length; i++) {
        tw = tweets[i]
        source = await SourceModel.findOne({where: {type: 'twitter', uid: tw.id}})
        if (!source) {
          await learn_service.learnAsync('twitter', tw.id, JSON.stringify(tw, null, '  '))
          saved_count++
        }
      }

      console.log('save ' + saved_count + ' tweet(s)')

      callback()
    })().catch(err => {
      console.error(err)
      process.exit(1)
    })
  }

  async getTweetsAsync(options) {
    return await this.getTweets(options)
  }

  getTweets(options) {
    return new Promise((resolve, reject) => {
      this.twitter_client.statusesUserTimeline(options, (error, result) => {
        if (error) {
          console.error(error)
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }

}

'use strict'

import Sequelize from 'sequelize'

const
  sequelize   = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host            : process.env.MYSQL_HOST,
      dialect         : 'mysql',
      pool            : {
        max    : 5,
        min    : 0,
        acquire: 30000,
        idle   : 10000
      },
      logging         : false,
      // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
      operatorsAliases: false
    }
  ),

  WordModel   = sequelize.define('words', {
    first_word : Sequelize.STRING,
    second_word: Sequelize.STRING,
    point      : Sequelize.INTEGER
  }),

  SourceModel = sequelize.define('sources', {
    type  : Sequelize.STRING,
    uid   : Sequelize.STRING,
    source: Sequelize.TEXT,
    parsed: Sequelize.INTEGER
  }, {
    getterMethods: {
      message() {

        let msg

        if (this.type === 'twitter') {
          let parsed_data = JSON.parse(this.source)

          msg = (
            parsed_data.retweeted_status
              ? parsed_data.retweeted_status.text
              : parsed_data.text
          )
        } else {
          msg = this.source
        }

        return msg
          .replace(/\@[a-z0-9\_\.\-]+/i, '') // remove @screen_name
          .replace(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/i, '') // remove URL
      }
    }
  })
;


(async () => {
  await sequelize.sync()
})()

export {
  sequelize, SourceModel, WordModel
}

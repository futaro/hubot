'use strict'

const Pipo = require('../lib/pipo/index')

const p = new Pipo()

p.collect_users({screen_name: 'ha_chu', include_rts: false, count: 200}, () => {
  p.parse(() => {
    process.exit(0)
  })
})


'use strict'

const Pipo = require('../lib/pipo/index')

const p = new Pipo()

p.collect(() => {
  p.parse(() => {
    process.exit(0)
  })
})


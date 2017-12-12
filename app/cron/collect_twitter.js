'use strict'

import Pipo from '../lib/pipo/index'

const p = new Pipo()

p.collect(() => {
  p.parse(() => {
    process.exit(0)
  })
})


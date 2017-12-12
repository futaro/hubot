'use strict'

import Pipo from '../pipo/index'

const p = new Pipo()

p.collect(() => {
  process.exit(0)
})

// p.parse(() => {
//   process.exit(0)
// })

// p.speak((message) => {
//   console.log(message)
//   process.exit(0)
// })

// p.learn('dev', 1, 'こんにちは。', ()=>{
//   process.exit(0)
// })

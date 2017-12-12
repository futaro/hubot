# Description:
#   Example scripts for you to examine and try out.
#
# Notes:
#   They are commented out by default, because most of them are pretty silly and
#   wouldn't be useful and amusing enough for day to day huboting.
#   Uncomment the ones you want to try and experiment with.
#
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

Pipo = require '../lib/pipo/index'

pipo = new Pipo()

module.exports = (robot) ->

  robot.hear /@pipo/i, (res) ->
    pipo.speak (msg) ->
      res.send '@' + res.message.user.name + ' ' + msg

  robot.hear /.*/i, (res) ->
    pipo.learn 'from_bot', (new Date()).getTime(), res.message.text, () ->
      pipo.parse () ->
        console.log('learn')




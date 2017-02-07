if (!window.Intl) {
  window.Intl = require('intl')
  require('intl/locale-data/jsonp/en-US.js')
  require('intl/locale-data/jsonp/es.js')
}

var IntlRelativeFormat = window.IntlRelativeFormat = require('intl-relativeformat')
var IntlMessageFormat = require('intl-messageformat')

require('intl-relativeformat/dist/locale-data/en.js')
require('intl-relativeformat/dist/locale-data/es.js')

let en = require('./en-US')
let es = require('./es')

var MESSAGES = {}

MESSAGES['en-US'] = en
MESSAGES.es = es

var locale = localStorage.locale || 'es'

module.exports = {
  message: function (text, opts) {
    opts = opts || {}
    var msg = new IntlMessageFormat(MESSAGES[locale][text], locale, null)
    return msg.format(opts)
  },

  date: new IntlRelativeFormat(locale)
}

'use strict'

const crypto = require('crypto')

const utils = {
  extractTags,
  encrypt,
  normalize
}

function extractTags (text) {
  if (text == null) return [] // Use the double equal for try if the parameter is null or undefined

  let matches = text.match(/#(\w+)/g) // This 'match' return me the words as tags

  if (matches === null) return []

  matches = matches.map(normalize) // The map function, does to each word the command that I write for to do.

  return matches
}

function normalize (text) {
  text = text.toLowerCase()
  text = text.replace(/#/g, '')
  return text
}

function encrypt (password) {
  let shasum = crypto.createHash('sha256')
  // password.toUpperCase()
  shasum.update(password)
  return shasum.digest('hex')
}

module.exports = utils

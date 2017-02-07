import page from 'page'
import title from 'title'
import empty from 'empty-element'
import template from './template'
import axios from 'axios'
import io from 'socket.io-client'
import picture from '../picture-card'

var socket = io.connect('http://localhost:5151')

page('/', loadPictures, (ctx, next) => {
  title('Inicio')
  var main = document.getElementById('main-container')
  empty(main).appendChild(template(ctx.pictures))
})

socket.on('image', function (image) {
  var PicEl = document.getElementById('picture-container')
  var first = PicEl.firstChild
  var img = picture(image)
  PicEl.insertBefore(img, first)
})

function loadPictures (ctx, next) {
  axios
    .get('/api/pictures')
    .then(res => {
      ctx.pictures = res.data
      next()
    })
    .catch(err => {
      return console.log(err)
    })
}

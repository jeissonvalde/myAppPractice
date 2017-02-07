import express from 'express'
import Db from './db'
import config from './db/config'
import multer from 'multer'
import ext from 'file-extension'

const app = express()
const port = process.env.PORT || 3000 //** ARREGLAR ESTO */
const db = new Db()

app.set('view engine', 'pug')

app.use(express.static('public'))

// Multer configs
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, + new Date() + '.' + ext(file.originalname))
  }
})

var upload = multer({ storage: storage }).single('picture')


app.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' })
})

app.get('/signup', (req, res) => {
  res.render('index', { title: 'Registrándote' })
})

app.get('/api/pictures', (req, res) => {

  db.connect()

  db.getImages(function (err, pictures) {
    if (err) {
      return res.send([])
    }

    res.send(pictures)
    db.disconnect()
  })
})

app.get('/api/picture', (req, res) => {
  //
})

app.post('/api/picture', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.status(500).send(`Error uploading file: ${err.message}`)
    }

    db.connect()

    let user = 'Pibe Valderrama'
    let src = 'uploads/' + req.file.filename
    let username = '4bR7uGnwCtYKQZRdQST5QW'
    let token = '1XYtCT0vYkdcLHX2G75Uxq1XYtCT0vYkdcLHX2G75Uxq'
    let text = '¿Vacío? #NoPasaNada soy el mejor!'

    let image = {
        src: src,
        userId: username,
        description: text,
        user: {
          username: 'JeissonValde',
          avatar: 'https://pbs.twimg.com/profile_images/626849450665877504/wzFzZ2MS.jpg',
          name: user
        }
    }

    let created = db.saveImage(image, function (err, img) {
      if (err) {
        return res.status(500).send(err.message)
      }

      res.send(`File upload successful`)
      db.disconnect()
    })
  })
})

app.post('/api/:id/like', (req, res) => {
  /*
  let id = req.id
  db.connect()
  db.likeImage(id, function (err, lk) {
    if (err) {
      return res.status(200).send(err.message)
    }
  })

  like
  */
})

app.listen(port, () => console.log(`Listening on port ${port}`))

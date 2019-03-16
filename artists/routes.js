const { Router } = require('express')
const auth = require('../auth/middleware')
const Artists = require('./model')
const Songs = require('../songs/model')

const router = new Router()

router.get('/artists', auth, (req, res, next) => {
    Artists
      .findAll({include: [Songs]})
      .then(artist => {
        if (!artist) {
          return res.status(404).send({
            message: `Playlists does not exist or isn't yours.`
          })
        }
        return res.send(artist)
      })
      .catch(error => next(error))
  })



module.exports = router

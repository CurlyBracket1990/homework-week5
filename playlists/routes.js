const { Router } = require('express')
const Playlists = require('./model')
const auth = require('../auth/middleware')
const Songs = require('../songs/model')

const router = new Router()

router.get('/playlists', auth, (req, res, next) => {

  Promise.all([
    Playlists.findAndCountAll({ where: { userId: req.body.userId } })
  ])
    .then(([playlists]) => {
      if (playlists.count < 1) {
        return res.status(204).send({
          message: "You don't have any playlists yet...",
        })
      }
      return res.status(200).send({
        message: "Your playlists:",
        playlists
      })
    })
    .catch(error => next(error))
})

router.get('/playlists/:id', auth, (req, res, next) => {
  Playlists
    .findByPk(req.params.id, { include: [Songs] })
    .then(playlist => {
      if (!playlist || playlist.userId !== req.body.userId) {
        return res.status(404).send({
          message: `Playlists does not exist or isn't yours.`
        })
      }
      return res.send(playlist)
    })
    .catch(error => next(error))
})

router.post('/playlists', auth, (req, res, next) => {
  Playlists
    .create(req.body)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlists does not exist`
        })
      }
      return res.status(201).send(playlist)
    })
    .catch(error => next(error))
})


router.delete('/playlists/:id', auth, (req, res, next) => {
  Playlists
    .findByPk(req.params.id)
    .then(playlist => {
      if (!playlist || playlist.userId !== req.body.userId) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return playlist.destroy()
        .then(() => res.status(200).send({
          message: `Playlist was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router


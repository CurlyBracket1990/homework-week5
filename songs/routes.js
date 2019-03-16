const { Router } = require('express')
const Songs = require('./model')
const Playlists = require('../playlists/model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/playlists/:id/songs', auth, (req, res, next) => {

    Promise.all([
        Songs.findAndCountAll({ where: { playlistId: req.params.id } })
    ])
        .then(([songs]) => {
            if (songs.count < 1) {
                return res.status(204).send({
                    message: "There aren't any songs on this playlist yet"
                    //Somehow this message doesnt show when the 204 is send, but it works in the playlists routes, whats the difference?
                    //Example in playlists.routes.js: router.get('/playlists')
                })
            }
            return res.status(200).send({
                message: "Songs on this playlist:",
                songs
            })
        })
        .catch(error => next(error))
})


router.post('/playlists/:id/songs', auth, (req, res, next) => {
    req.body.playlistId = req.params.id
    Playlists.findByPk(req.params.id)
        .then(playlist => {
            if (!playlist || playlist.userId !== req.body.userId) {
                return res.status(404).send({
                    message: `Playlists does not exist or isn't yours.`
                })
            }
        })
    Songs
        .create(req.body)      
        .then(song => {
            if (!song) {
                return res.status(404).send({
                    message: `Something went wrong`
                })
            }
            return res.status(201).send({
                message: "The song has been added to your playlist.",
                song
            })
        })
        .catch(error => next(error))
})

module.exports = router


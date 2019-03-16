const { Router } = require('express')
const { toJWT } = require('./jwt')
const Users = require('../users/model')
const auth = require('./middleware')
const bcrypt = require('bcrypt')


const router = new Router()

router.post('/tokens', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        res.status(400).send({
            message: 'Please supply a valid email and password'
        })
    }
    else {
        Users
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(entity => {
                if (!entity) {
                    res.status(400).send({
                        message: 'User with that email does not exist'
                    })
                }
                if (bcrypt.compareSync(req.body.password, entity.password)) {
                    res.send({
                        message: "You have succesfully logged in",
                        jwt: toJWT({ userId: entity.id })
                    })
                }
                else {
                    res.status(400).send({
                        message: 'Password was incorrect'
                    })
                }
            })
            .catch(err => {
                console.error(err)
                res.status(500).send({
                    message: 'Something went wrong'
                })
            })
    }
})

router.get('/tokens', auth, (req, res) => {
    res.send({
      message: `Thank you for authenticating ${req.user.email}.`,
    })
  })

module.exports = router
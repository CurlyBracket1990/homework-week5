const { Router } = require('express')
const Users = require('./model')
const bcrypt = require('bcrypt');

const router = new Router()

router.post('/users', (req, res, next) => {
    if(Object.keys(req.body).length === 0 ){
        return res.status(422).send({
            message: "Please fill in your e-mail, password and confirm your password"
        }) 
    }
    if(!req.body.password_confirmation){
        return res.status(422).send({
            message: "Please confirm your password"
        }) 
    }
    if (req.body.password !== req.body.password_confirmation) {
        return res.status(422).send({
            message: "Your passwords did not match, please try again."
        })
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    Users
        .create(req.body)
        .then(() => {
            return res.status(201).send({
                message: "Thank you for signing up!"
            })
        })
        .catch(err => {
            console.error(err)
            res.status(500).send({
                message: 'Something went wrong'
            })
        })
})

module.exports = router


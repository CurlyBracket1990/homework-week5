const Sequelize = require('sequelize')
const sequelize = require('../db')
const Playlists = require('../playlists/model')

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'users'
})

User.hasMany(Playlists)

module.exports = User
const Sequelize = require('sequelize')
const sequelize = require('../db')
const Songs = require('../songs/model')

const Playlist = sequelize.define('playlists', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false,
  tableName: 'playlists'
})

Playlist.hasMany(Songs)

module.exports = Playlist
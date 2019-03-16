const Sequelize = require('sequelize')
const sequelize = require('../db')

const Song = sequelize.define('songs', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false
  },
  albumTitle: {
    type: Sequelize.STRING,
    field: "album_title",
    allowNull: false
  },
  playlistId: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false,
  tableName: 'songs'
})

module.exports = Song
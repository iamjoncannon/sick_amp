'use strict'
const Sequelize = require('sequelize');

const db = require('./database')

const Yada = db.define('Yada', {

    name: {
      type: Sequelize.STRING, 
      // allowNull: false
    },
   
});

module.exports = {
 	db,
 	Yada
}

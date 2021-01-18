const {DataTypes} = require('sequelize');
const db = require('../db');

const Comment = db.define('comment', {
    
    commentText: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userID: {
        type: DataTypes.INTEGER,
    },
    pageID: {
        type: DataTypes.INTEGER,
    }
})

module.exports = Comment
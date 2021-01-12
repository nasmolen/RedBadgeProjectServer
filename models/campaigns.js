const {DataTypes} = require('sequelize');
const db = require('../db');

const Campaign = db.define('campaign', {
    
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    videoURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    softCap: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userID: {
        type: DataTypes.INTEGER,
    },
    complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Campaign
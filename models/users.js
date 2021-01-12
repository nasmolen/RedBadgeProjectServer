const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        values: ['basic', 'admin'],
        defaultValue: 'basic'
    }
});

module.exports = User;
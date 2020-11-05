const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    mobile_number: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, { timestamps: true })

console.log(User === sequelize.models.User); // true
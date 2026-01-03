const db = require('../utils/database');
const {DataTypes} = require('sequelize') ;

const Users = db.define(
    'users',
    {
        id:{type:DataTypes.UUID, primaryKey: true, allowNull:false},
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false,unique: true, validate: {isEmail: true}},
        password: { type:DataTypes.STRING, allowNull: false},
        role:{type: DataTypes.STRING, defaultValue: 'normal', allowNull: false},
        status:{type: DataTypes.STRING, defaultValue: 'active', allowNull: false},
        isVerified:{type: DataTypes.BOOLEAN,allowNull: false, field: 'is_verified', defaultValue: false}
    }
)
module.exports = Users
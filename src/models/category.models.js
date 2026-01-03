const db = require('../utils/database')
const {DataTypes} = require('sequelize')

const Category = db.define('category', {
    id:{
        type:DataTypes.UUID,
        primaryKey: true,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
{timestamps: false}
) 
module.exports = Category;
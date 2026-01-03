const db = require('../utils/database')
const {DataTypes} = require('sequelize')

const Tag = db.define('tag', {
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
module.exports = Tag;
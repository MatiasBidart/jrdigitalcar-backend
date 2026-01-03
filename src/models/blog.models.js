const db = require('../utils/database');
const {DataTypes} = require('sequelize') ;
const Users = require('./user.models');
const Category = require('./category.models');

const Blog = db.define(
    'blog',
    {
        id:{type:DataTypes.UUID, primaryKey: true, allowNull:false},
        title: {type: DataTypes.STRING, allowNull: false},
        slug: {type: DataTypes.STRING, allowNull: false, unique: true},
        excerpt: {type: DataTypes.STRING},
        content: {type:DataTypes.TEXT, allowNull: false},
        imgURL: {type: DataTypes.STRING, allowNull: false, field: 'img_url'},
        userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        references: {
            key: 'id',
            model: Users
        }
        },
        categoryId: {
        type: DataTypes.UUID,
        field: 'category_id',
        references: {
            key: 'id',
            model: Category
        }
        },
    }
)
module.exports = Blog
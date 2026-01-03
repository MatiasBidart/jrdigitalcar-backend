const db = require('../utils/database')
const {DataTypes} = require('sequelize');
const Blog = require('./blog.models');
const Tag = require('./tag.models');

const TagsBlogs = db.define('tags_blogs', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    blogId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'blog_id',
        references: {
            key: 'id',
            model: Blog
        }
    },
    tagId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'tag_id',
        references: {
            key: 'id',
            model: Tag
        }
    }
},
{timestamps: false}
) 
module.exports = TagsBlogs;
const Blog = require('./blog.models')
const Category = require('./category.models')
const Tag = require('./tag.models')
const TagsBlogs = require('./tagsBlogs.models')
const Users = require('./user.models')

const initModels = () => {
// User -> Blog (1 : M)
    Blog.belongsTo(Users)
    Users.hasMany(Blog)
// Blog -> CategoriesBlogs (1 : 1)
    Blog.belongsTo(Category)
    Category.hasMany(Blog)

// Blog -> TagsBlogs (1 : M)
    TagsBlogs.belongsTo(Blog)
    Blog.hasMany(TagsBlogs) 
// Tag -> TagsBlogs (1 : M)
    TagsBlogs.belongsTo(Tag)
    Tag.hasMany(TagsBlogs)
}

module.exports = initModels
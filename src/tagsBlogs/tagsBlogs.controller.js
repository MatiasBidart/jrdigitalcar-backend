const Tag = require('../models/tag.models');
const TagsBlogs = require('../models/tagsBlogs.models'); // ajustar ruta
const { v4: uuid } = require('uuid');

// Obtener todas las relaciones
const getAllTagsBlogs = () => {
    return TagsBlogs.findAll();
};

// Obtener por ID
const getTagBlogById = (id) => {
    return TagsBlogs.findOne({ where: { id } });
};

// Obtener todas las tags de un blog
const getTagsByBlogId = (blogId) => {
    return TagsBlogs.findAll({
        where: { blogId },
        include: [
        {
                model: Tag,
        }
    ]
    });
};

// Obtener todos los blogs que usan un tag
const getBlogsByTagId = (tagId) => {
    return TagsBlogs.findAll({ where: { tagId } });
};

// Crear relación
const createTagBlog = (data) => {
    return TagsBlogs.create({
        id: uuid(),
        blogId: data.blogId,
        tagId: data.tagId
    });
};

const updateTagBlog = async (id, updates) => {
    const data = await TagsBlogs.update(updates, {
        where: { id },
        returning: true
    });

    if (data[0] === 0) return null; // No rows updated

    return data[1][0]; // Return updated object
};

// Eliminar relación
const deleteTagBlog = (id) => {
    return TagsBlogs.destroy({ where: { id } });
};

module.exports = {
    getAllTagsBlogs,
    getTagBlogById,
    getTagsByBlogId,
    getBlogsByTagId,
    createTagBlog,
    updateTagBlog,
    deleteTagBlog
};

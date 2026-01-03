const Blog = require('../models/blog.models');
const Category = require('../models/category.models');
const Tag = require('../models/tag.models');
const TagsBlogs = require('../models/tagsBlogs.models')
const uuid = require('uuid');
const Users = require('../models/user.models');

// ---- Helper para generar slug automáticamente ----
function generateSlug(text) {
    return text
        .toString()
        .toLowerCase()
        .normalize("NFD")             // elimina acentos
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '-')         // espacios → guiones
        .replace(/[^a-z0-9-]/g, '')   // caracteres raros
        .replace(/--+/g, '-')         // múltiple guiones
        .replace(/^-+|-+$/g, '');     // trim
}
// -------------

const getAllBlogs = async () => {
    const data = await Blog.findAll({
        attributes: {exclude: ['updatedAt', 'userId']},
        include: [
            {
                model: Users,
                as: 'user',
                attributes: ["name"]
            },
            {
                model: Category,
                as: 'category',
                attributes: ["name"]
            },
            {
                model: TagsBlogs,
                as: 'tags_blogs',
                include: [{ model: Tag }]
            }
        ]
    })
    return data
}
const getBlogById = async (id) => {
    const data =await Blog.findOne({
        where: {id},
        attributes: {exclude: ['updatedAt', 'userId']},
        include: [
            {
                model: Users,
                as: 'user',
                attributes: ["name"]
            },
            {
                model: Category,
                as: 'category',
                attributes: ["name"]
            },
            {
                model: TagsBlogs,
                as: 'tags_blogs',
                attributes: {exclude: ['id', 'productId']},
                include: [
                    {
                        model: Tag,
                        attributes: ["name"]
                    }
                ]
            }
        ]
    })
    return data
}


const getBlogByCategoryId = async (categoryId) => {
    const data =await Blog.findAll({
        attributes: {exclude: ['updatedAt']},
        where:{categoryId: categoryId},
        include: [
                {
                    model: Category,
                    attributes: ["name"]
                }
            ]
        
    })
    return data
}
const createBlog = async (data) => {
    try {
        const newBlog = await Blog.create({
            id: uuid.v4(),
            title: data.title,
            slug: generateSlug(data.title),
            excerpt: data.excerpt || null,
            content: data.content,
            imgURL: data.imgURL,
            userId: data.userId,
            categoryId: data.categoryId
        });

        return newBlog;

    } catch (error) {
        console.error("Error creando blog:", error);
        throw error;
    }
};

const updateBlog = async (id, data) => {
    const result = await Blog.update(data, { where:{id}})
    return result
}
const deleteBlog = async (id) => {
    const data = await Blog.destroy({where:{id}})
    return data
}

module.exports = {
    getAllBlogs,
    getBlogById,
    getBlogByCategoryId,
    createBlog,
    updateBlog,
    deleteBlog
}
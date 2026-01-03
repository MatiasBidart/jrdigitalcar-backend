const Category = require('../models/category.models');
const uuid = require('uuid');

const getAllCategories = async() => {
    const data = await Category.findAll()
    return data
}
const getCategoryById = async(id) => {
    const data = await Category.findOne({where: {id}})
    return data
}
const createCategory = async(name, description) => {
    const data = await Category.create(
        {
            id: uuid.v4(),
            name
        }
    )
    return data
}
const patchCategory = async(data, id) => {
    const response = await Category.update(data, { where:{id}})
    return response
}
const deleteCategory = async(id) => {
    const data = await Category.destroy({where: {id}})
    return data
}
module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    patchCategory,
    deleteCategory
}
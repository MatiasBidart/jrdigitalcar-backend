const Tag = require('../models/tag.models');   // ajustá la ruta si necesario
const { v4: uuid } = require('uuid');

// OBTENER TODOS
const getAllTags = () => {
    return Tag.findAll();
};

// OBTENER POR ID
const getTagById = (id) => {
    return Tag.findOne({ where: { id } });
};

// CREAR TAG
const createTag = (data) => {
    return Tag.create({
        id: uuid(),
        name: data.name
    });
};

// ACTUALIZAR TAG
const updateTag = (id, data) => {
    return Tag.update(data, { where: { id } });
};

// ELIMINAR TAG
const deleteTag = (id) => {
    return Tag.destroy({ where: { id } });
};

module.exports = {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
};

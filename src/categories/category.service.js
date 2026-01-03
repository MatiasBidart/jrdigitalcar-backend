const categoryControllers = require('./category.controller');
const getAllCategories = (req, res) => {
    categoryControllers.getAllCategories()
    .then((data)=>{res.status(200).json(data)})
    .catch((err) => {res.status(400).json({message: err.message})})
}
const getCategoryById = (req, res) => {
    const id = req.params.id 
    categoryControllers.getCategoryById(id)
    .then(data => {
        if(data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch(err=>{res.status(400).json({message: err.message})})
}
const postCategory = (req, res) => {
    const {name, description} = req.body;
    if (name) {
        categoryControllers.createCategory(name, description)
        .then(data => {res.status(201).json(data)})
        .catch(err => {res.status(400).json({message: err.message})})
    } else {
        res.status(400).json({message: 'Missing Data', fields: {
            name: 'category_name',
            description: 'description',       
        }})
    }
}
const patchCategory = (req,res) => {
    const id = req.params.id
    const {name, description} = req.body;
    if (name || description) {
        categoryControllers.patchCategory({ name, description }, id)
        .then(data => res.status(200).json({message: 'Edited Succesfully', data}))
        .catch(err => res.status(400).json({message: err.message}))
    } else {
        res.status(400).json({message: 'You have to post the new data to update', fields: {
            name: 'category_name',
            description: 'description'
        }})
    }
}

const deleteCategory = (req, res) => {
    const id = req.params.id
    categoryControllers.deleteCategory(id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({message: err.message}))
}
module.exports = {
    getAllCategories,
    getCategoryById,
    postCategory,
    patchCategory,
    deleteCategory
}
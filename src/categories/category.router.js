const router = require('express').Router()
const categoryServices = require('./category.service')

router.route('/')
    .get(categoryServices.getAllCategories)
    .post(categoryServices.postCategory)

router.route('/:id')
    .get(categoryServices.getCategoryById)
    .patch(categoryServices.patchCategory)
    .delete(categoryServices.deleteCategory)


module.exports = router
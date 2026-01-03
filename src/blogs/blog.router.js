const router = require('express').Router() 
const blogServices = require('./blog.service')

router.route('/')
    .get(blogServices.getAllBlogs)
    .post(blogServices.createBlog)
    
router.route('/category/:categoryId')
    .get(blogServices.getBlogsByCategoryId)

router.route('/:id')
    .get(blogServices.getBlogById)
    .patch(blogServices.patchBlog)
    .delete(blogServices.deleteBlog)

    
module.exports = router
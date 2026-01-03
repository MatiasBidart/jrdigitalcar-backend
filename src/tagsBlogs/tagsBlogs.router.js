const router = require('express').Router() 
const tagsBlogsServices = require('./tagsBlogs.service');

router.route('/')
    .get(tagsBlogsServices.getAllTagsBlogs)
    .post(tagsBlogsServices.createTagBlog)

router.get('/blog/:blogId', tagsBlogsServices.getTagsByBlogId)
router.get('/tag/:tagId', tagsBlogsServices.getBlogsByTagId)

router.route('/:id')
    .get(tagsBlogsServices.getTagBlogById)
    .patch(tagsBlogsServices.updateTagBlog)
    .delete(tagsBlogsServices.deleteTagBlog)
module.exports = router
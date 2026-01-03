const tagsBlogsController = require('./tagsBlogs.controller');

// GET ALL RELATIONS
const getAllTagsBlogs = (req, res) => {
    tagsBlogsController.getAllTagsBlogs()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ message: err.message }));
};

// GET BY ID
const getTagBlogById = (req, res) => {
    const id = req.params.id;

    tagsBlogsController.getTagBlogById(id)
        .then(data => {
            if (!data) return res.status(404).json({ message: "Relation not found" });
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json({ message: err.message }));
};

// GET TAGS BY BLOG ID
const getTagsByBlogId = (req, res) => {
    const blogId = req.params.blogId;

    tagsBlogsController.getTagsByBlogId(blogId)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ message: err.message }));
};

// GET BLOGS BY TAG ID
const getBlogsByTagId = (req, res) => {
    const tagId = req.params.tagId;

    tagsBlogsController.getBlogsByTagId(tagId)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ message: err.message }));
};

// CREATE RELATION
const createTagBlog = (req, res) => {
    const { blogId, tagId } = req.body;

    if (!blogId || !tagId) {
        return res.status(400).json({
            message: "Missing required fields",
            fields: {
                blogId: "UUID",
                tagId: "UUID"
            }
        });
    }

    tagsBlogsController.createTagBlog({ blogId, tagId })
        .then(data => res.status(201).json(data))
        .catch(err => res.status(400).json({ message: err.message }));
};

const updateTagBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await TagsBlogsService.updateTagBlog(id, req.body);

        if (!updated) {
            return res.status(404).json({ message: 'Relation not found' });
        }

        return res.status(200).json(updated);

    } catch (error) {
        return res.status(500).json({ message: 'Error updating relation', error });
    }
};

// DELETE RELATION
const deleteTagBlog = (req, res) => {
    const id = req.params.id;

    tagsBlogsController.deleteTagBlog(id)
        .then(result => {
            if (result) return res.status(204).json();
            res.status(404).json({ message: "Invalid ID" });
        })
        .catch(err => res.status(400).json({ message: err.message }));
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

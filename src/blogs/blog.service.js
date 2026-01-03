const blogController = require('./blog.controller');

// GET ALL
const getAllBlogs = (req, res) => {
    blogController.getAllBlogs()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ message: err.message }));
};

// GET BY ID
const getBlogById = (req, res) => {
    const id = req.params.id;

    blogController.getBlogById(id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "Blog not found" });
            }
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json({ message: err.message }));
};



//CategoryId
const getBlogsByCategoryId = (req, res) => {
    const categoryId = req.params.categoryId;

    blogController.getBlogByCategoryId(categoryId)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ message: err.message }));
};

// UPDATE
const patchBlog = (req, res) => {
    const id = req.params.id;

    const { title, excerpt, content, imgURL, userId, categoryId } = req.body;

    blogController.updateBlog(id, {
        title,
        excerpt,
        content,
        imgURL,
        userId,
        categoryId
    })
        .then(result => {
            if (result[0]) {
                return res
                    .status(200)
                    .json({ message: `Blog with ID ${id} updated successfully` });
            }

            res.status(404).json({ message: "Invalid ID/IDs" });
        })
        .catch(err => res.status(400).json({ message: err.message }));
};

// DELETE
const deleteBlog = (req, res) => {
    const id = req.params.id;

    blogController.deleteBlog(id)
        .then(data => {
            // destroy devuelve 1 si eliminó, 0 si no
            if (data) return res.status(204).json();
            return res.status(404).json({ message: "Invalid ID" });
        })
        .catch(err => res.status(400).json({ message: err.message }));
};

// CREATE
const createBlog = (req, res) => {
    const { title, excerpt, content, imgURL, userId, categoryId } = req.body;

    if (!title || !content || !imgURL || !userId || !categoryId) {
        return res.status(400).json({
            message: "Missing required fields",
            fields: {
                title: "string",
                content: "text",
                imgURL: "string (url)",
                userId: "UUID",
                categoryId: "UUID"
            }
        });
    }

    blogController.createBlog({
        title,
        excerpt,
        content,
        imgURL,
        userId,
        categoryId
    })
        .then(data => res.status(201).json(data))
        .catch(err => res.status(400).json({ message: err.message }));
};

module.exports = {
    getAllBlogs,
    getBlogById,
    getBlogsByCategoryId,
    patchBlog,
    deleteBlog,
    createBlog
};

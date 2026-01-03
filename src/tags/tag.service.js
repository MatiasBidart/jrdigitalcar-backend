const tagController = require('./tag.controller');

// GET ALL
const getAllTags = (req, res) => {
    tagController.getAllTags()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ message: err.message }));
};

// GET BY ID
const getTagById = (req, res) => {
    const id = req.params.id;

    tagController.getTagById(id)
        .then(data => {
            if (!data) return res.status(404).json({ message: "Tag not found" });
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json({ message: err.message }));
};

// CREATE
const createTag = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Missing required fields",
            fields: { name: "string" }
        });
    }

    tagController.createTag({ name })
        .then(data => res.status(201).json(data))
        .catch(err => res.status(400).json({ message: err.message }));
};

// PATCH
const patchTag = (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    tagController.updateTag(id, { name })
        .then(result => {
            if (result[0]) {
                return res.status(200).json({ message: `Tag ${id} updated successfully` });
            }
            res.status(404).json({ message: "Invalid ID" });
        })
        .catch(err => res.status(400).json({ message: err.message }));
};

// DELETE
const deleteTag = (req, res) => {
    const id = req.params.id;

    tagController.deleteTag(id)
        .then(result => {
            if (result) return res.status(204).json();
            res.status(404).json({ message: "Invalid ID" });
        })
        .catch(err => res.status(400).json({ message: err.message }));
};

module.exports = {
    getAllTags,
    getTagById,
    createTag,
    patchTag,
    deleteTag
};

const router = require('express').Router();
const tagServices = require('./tag.service');

// RUTAS DE TAG
router.route('/')
    .get(tagServices.getAllTags)
    .post(tagServices.createTag)
router.route('/:id')
    .get(tagServices.getTagById)
    .patch(tagServices.patchTag)
    .delete(tagServices.deleteTag)

module.exports = router;

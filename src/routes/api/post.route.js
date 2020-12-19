const express = require('express');
const {
  validate
} = require('express-validation');
const postController = require('../../controllers/post.controller');
const {
  getPostValidation,
  createPostValidation,
  editPostValidation,
  deletePostValition
} = require('../../validations/post.validation');

const router = express.Router();

router.route('/')
  // get post list
  .get(validate(getPostValidation, {
    keyByField: true
  }), postController.listPost)
  // create new post
  .post(validate(createPostValidation, {
    keyByField: true
  }), postController.createPost);

router.route('/:id')
  // get a existed post
  .get(postController.showPost)
  // edit a existed post
  .put(validate(editPostValidation, { keyByField: true }), postController.editPost)
  .patch(validate(editPostValidation, { keyByField: true }), postController.editPost)
  // delete a existed post
  .delete(validate(deletePostValition, { keyByField: true }), postController.deletePost);

module.exports = router;

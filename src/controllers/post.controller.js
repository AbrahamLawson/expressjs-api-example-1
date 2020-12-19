const APIError = require('../utils/APIError');
const Post = require('../models/post.model');

const {
  responseSuccess,
  responseError
} = require('../utils/templates/response')
const {
  postSerializer,
  postCollectionSerializer
} = require('../serializers/post.serializer');
const { response } = require('express');

exports.listPost = async (req, res, next) => {
  try {
    const resPerPage = 10

    // optional query params
    const {
      page = 1
    } = req.query

    // geting post list ( with optional params ) and calculate the number of that list
    const numberOfSkipDocs = (resPerPage * page) - resPerPage
    const [posts, totalPost] = await Promise.all([
      Post.find().skip(numberOfSkipDocs).setOptions({
        limit: resPerPage
      }),
      Post.estimatedDocumentCount()
    ])

    // formating response data
    const formatedData = {
      posts: postCollectionSerializer(posts),
      meta: {
        totalPost
      }
    }
    return responseSuccess( res, formatedData)
  } catch (error) {
    return responseError(404, res)
  }
};

exports.createPost = async (req, res, next) => {
  try {
    // create new post
    const post = new Post(req.body);
    const savedPost = await post.save();

    // handle error
    if (!savedPost) {
    return responseError(res, 422)
    }

    // formating response data
    const formatedData = {
      post: postSerializer(savedPost)
    }
    return responseSuccess(res. formatedData)
  } catch (error) {
    return responseError(res, 422)
  }
};

exports.showPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const formatedData = {
      post: postSerializer(post)
    }
    return responseSuccess(res, formatedData)
  } catch (error) {
    return responseError(res)
  }
};

exports.editPost = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };

    const post = await Post.findOneAndUpdate(
      filter,
      req.body, 
      { returnOriginal: false }
    )
    
    const formatedData = {
      post: postSerializer(post)
    }
    return responseSuccess(res, formatedData)
  } catch (error) {
    return responseError(422, res)
  }
}

exports.deletePost = async (req, res, next) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id })
    return result.ok && result.deletedCount ? responseSuccess(res) : responseError(res, 422)
  } catch (error) {
    return responseError(res, 422)
  }
};
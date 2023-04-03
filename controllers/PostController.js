const logger = require('./../loger/loger')
const PostService = require('../services/PostService')

class PostController {
  async getAllPost(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 0;
      const limit = parseInt(req.query.limit, 10) || 10
      let posts = await PostService.getAllPost(page, limit)
      return res.status(200).json(posts)
    }
    catch (error) {
      logger.error('Error in PostController.getAllPost ' + error.message);
      return res.status(400).json(error.message)
    }
  }

  async getCountPost(req, res) {
    try {
      const posts = await PostService.countpost()
      return res.status(200).json(posts)
    } catch (error) {
      logger.error('Error in PostController.getCountPost ' + error.message);
      return res.status(400).json(error.message)
    }
  }

  async getAllPostsearch(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 0;
      const limit = parseInt(req.query.limit, 10) || 10
      const { search } = req.query
      const posts = await PostService.getAllPostSearch(page, limit, search)
      return res.status(200).json(posts)
    }
    catch (error) {
      logger.error('Error in PostController.getAllPostsearch ' + error.message);
      return res.status(400).json(error.message)
    }
  }

  async getOnePost(req, res) {
    try {
      const id = req.params.id;
      const post = await PostService.getOnePost(id)
      return res.status(200).json(post)
    } catch (error) {
      logger.error('Error in PostController.getOnePost ' + error.message);
      return res.status(400).json(error.message)
    }
  }

  async addPost(req, res) {
    try {
      const { name, text } = req.body;
      await PostService.addPost(name, text, req.user.id)
      return res.status(201)
    } catch (error) {
      logger.error('Error in PostController.addPost ' + error.message);
      return res.status(400).json(error.message)
    }
  }

  async deletePost(req, res) {
    const postid = req.params.id;
    try {
      await PostService.deletePost(postid, req.user.id)
      return res.status(204)
    } catch (error) {
      logger.error('Error in PostController.deletepost ' + error.message);
      return res.status(400).json(error.message)
    }
  }

  async putPost(req, res) {
    const { text, name } = req.body
    const id = req.params.id;
    try {
      await PostService.putPost(id, text, name, req.user.id)
      return res.status(204)
    } catch (error) {
      logger.error('Error in PostController.putPost ' + error.message);
      return res.status(400).json('Error')
    }
  }

  async getUserPosts(req, res) {
    const userId = req.user.id;
    const page = parseInt(req.query.page, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10
    try {
      const posts = await PostService.getUserPosts(userId, page, limit)
      return res.status(200).json(posts)
    } catch (error) {
      logger.error('Error in PostController.getUserPosts ' + error.message);
      return res.status(400).json(e.message)
    }
  }

  async getUserPostsCount(req, res) {
    const userId = req.user.id
    try {
      const posts = await PostService.getUserPostsCount(userId)
      return res.status(200).json(posts)
    } catch (error) {
      logger.error('Error in PostController.getUserPostsCount ' + error.message);
      return res.status(400).json(e.message)
    }
  }
}

module.exports = new PostController();
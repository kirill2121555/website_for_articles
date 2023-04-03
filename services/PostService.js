const PostModel = require('../models/PostModel');
const userModel = require('../models/userModel');
class PostService {

    async getAllPost(page, limit) {
        const posts = await PostModel.find()
            .sort({ datecreate: -1 })
            .skip(page * limit)
            .limit(limit)
        return posts
    }

    async getAllPostSearch(page, limit, search) {
        const posts = await PostModel.find({ $text: { $search: search } })
            .sort({ datecreate: -1 })
            .skip(page * limit)
            .limit(limit)
        const postsCount = await PostModel.find({ $text: { $search: search } }).countDocuments()
        return { posts, postsCount }
    }

    async getOnePost(id) {
        let post = await PostModel.findById(id).lean();
        return post
    }

    async addPost(name, text, id) {
        let post
        Promise.all([
            post = await PostModel.create({
                name: name,
                text: text,
                author: id
            }),
            await userModel.findByIdAndUpdate(id, {
                $push: { post: post.id },
            }),
        ])
        return
    }

    async deletePost(postid, id) {
        const user = await userModel.findById(id)
        if (!user.post.includes(postid)) {
            throw new Error('you cant delete this post ')
        }
        await userModel.findByIdAndUpdate(id, {
            $pull: { post: postid },
        })
        await PostModel.findByIdAndDelete(postid)
        return 
    }

    async putPost(postid, text, name, userid) {
        const user = await userModel.findById(userid)
        if (!user.post.includes(postid)) {
            throw new Error('you cant change this post ')
        }
        return await PostModel.findByIdAndUpdate(postid, {
            name: name,
            text: text
        })
    }

    async countpost() {
        const total_count_posts = await PostModel.countDocuments()
        return total_count_posts
    }

    async getUserPosts(userId, page, limit) {
        const posts = await PostModel.find({ author: userId })
            .sort({ datecreate: -1 })
            .skip(page * limit)
            .limit(limit)
        return posts 
    }

    async getUserPostsCount(userId){
        const total_count_user_posts = await PostModel.find({ author: userId }).countDocuments()
        return total_count_user_posts
    }
    
}
module.exports = new PostService();
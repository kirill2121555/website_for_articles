const Router = require('express')
const router = new Router()
const { body } = require('express-validator')
const passport = require('passport');
require('../auth/passport')
const CommentController = require('../controllers/CommentController');
const userController = require('../controllers/userController');
const markController = require('../controllers/MarkController');
const PostController = require('../controllers/PostController');
const validationMiddlevare = require('../middlewares/validation-middlevare');
const fileMiddleware = require('../middlewares/file-middleware');

router.post('/upload',
  passport.authenticate('jwt', { session: false }),
  fileMiddleware.single('picture'),
  userController.addFoto)

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', passport.authenticate('jwt', { session: false }), userController.check)


router.get('/posts', PostController.getAllPost)//   /posts
router.get('/post/:id', PostController.getOnePost)// post
router.get('/user_post', passport.authenticate('jwt', { session: false }), PostController.getUserPosts)//user_post
router.get('/count_user_posts', passport.authenticate('jwt', { session: false }), PostController.getUserPostsCount)   // count_user_posts
router.post('/post', passport.authenticate('jwt', { session: false }), PostController.addPost)   //    post
router.delete('/post/:id', passport.authenticate('jwt', { session: false }), PostController.deletePost)    //   post
router.put('/post/:id', passport.authenticate('jwt', { session: false }), PostController.putPost)   //post
router.get('/post_search', PostController.getAllPostsearch)    // post_search
router.get('/count_posts', PostController.getCountPost)


router.post('/comment/:id', passport.authenticate('jwt', { session: false }), CommentController.CreateComment)
router.get('/comments/:id', CommentController.GetComments)


router.get('/user_mark/:id', passport.authenticate('jwt', { session: false }), markController.getUserMark)
router.get('/marks_post/:id', markController.getmarkpost)
router.post('/mark/:mark/:id', passport.authenticate('jwt', { session: false }), markController.grade)

router.get('/profile_info', passport.authenticate('jwt', { session: false }), userController.ProfileInformation);
router.put('/nick', passport.authenticate('jwt', { session: false }), userController.updateNick);
router.put('/email', passport.authenticate('jwt', { session: false }), userController.updateEmail);


module.exports = router
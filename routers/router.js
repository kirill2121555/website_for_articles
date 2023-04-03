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


router.get('/getAllPost', PostController.getAllPost)
router.get('/getOnePost/:id', PostController.getOnePost)
router.get('/getUserPosts', passport.authenticate('jwt', { session: false }), PostController.getUserPosts)
router.get('/getUserPostsCount', passport.authenticate('jwt', { session: false }), PostController.getUserPostsCount)
router.post('/addPost', passport.authenticate('jwt', { session: false }), PostController.addPost)
router.delete('/deletePost/:id', passport.authenticate('jwt', { session: false }), PostController.deletePost)
router.put('/putPost/:id', passport.authenticate('jwt', { session: false }), PostController.putPost)
router.get('/getAllPostsearch', PostController.getAllPostsearch)
router.get('/getCountPost', PostController.getCountPost)


router.post('/addComment/:id', passport.authenticate('jwt', { session: false }), CommentController.CreateComment)
router.get('/getComments/:id', CommentController.GetComments)


router.get('/getmark/:id', passport.authenticate('jwt', { session: false }), markController.getUserMark)
router.get('/getmarkpost/:id', markController.getmarkpost)
router.post('/mark/:mark/:id', passport.authenticate('jwt', { session: false }), markController.grade)

router.get('/ProfileInformation', passport.authenticate('jwt', { session: false }), userController.ProfileInformation);
router.post('/updateNick', passport.authenticate('jwt', { session: false }), userController.updateNick);
router.post('/updateEmail', passport.authenticate('jwt', { session: false }), userController.updateEmail);

router.get('/getComment', CommentController.GetComments)
router.post('/grade/:id', CommentController.grade)


module.exports = router
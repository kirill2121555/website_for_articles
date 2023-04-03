const Router = require('express')
const router = new Router()
const { body } = require('express-validator')
const { query } = require('express-validator');
const { param, check } = require('express-validator')

const passport = require('passport');
require('../auth/passport')
const CommentController = require('../controllers/CommentController');
const userController = require('../controllers/userController');
const markController = require('../controllers/MarkController');
const PostController = require('../controllers/PostController');
const validationMiddlevare = require('../middlewares/validation-middlevare');
const fileMiddleware = require('../middlewares/file-middleware');


router.post('/registration',
  body('email').isEmail().withMessage('field must be Email'),
  body('password').isLength({ min: 5, max: 15 }).withMessage('field must be password'),
  validationMiddlevare,
  userController.registration);
router.post('/login',
  body('email').isEmail().withMessage('field must be Email'),
  body('password').isLength({ min: 5, max: 15 }).withMessage('field must be password'),
  validationMiddlevare,
  userController.login);
router.get('/auth', passport.authenticate('jwt', { session: false }), userController.check)

router.get('/posts',
  query('page').toInt(),
  query('limit').toInt(),
  validationMiddlevare,
  PostController.getAllPost)
router.get('/post/:id',
  param('id').isMongoId().withMessage('param must be id'),
  validationMiddlevare,
  PostController.getOnePost)
router.get('/user_post', passport.authenticate('jwt', { session: false }), PostController.getUserPosts)
router.get('/count_user_posts', passport.authenticate('jwt', { session: false }), PostController.getUserPostsCount)
router.post('/post',
  passport.authenticate('jwt', { session: false }),
  body('name').notEmpty().withMessage('field cannot be empty'),
  body('text').notEmpty().withMessage('field cannot be empty'),
  validationMiddlevare,
  PostController.addPost)
router.delete('/post/:id',
  passport.authenticate('jwt', { session: false }),
  param('id').isMongoId().withMessage('param must be id'),
  validationMiddlevare,
  PostController.deletePost)
router.put('/post/:id',
  passport.authenticate('jwt', { session: false }),
  param('id').isMongoId().withMessage('param must be id'),
  body('name').notEmpty().withMessage('field cannot be empty'),
  body('text').notEmpty().withMessage('field cannot be empty'),
  validationMiddlevare,
  PostController.putPost)
router.get('/post_search',
  query('page').toInt(),
  query('limit').toInt(),
  query('search').notEmpty('field cannot be empty'),
  validationMiddlevare,
  PostController.getAllPostsearch)
router.get('/count_posts', PostController.getCountPost)

router.post('/comment/:id',
  passport.authenticate('jwt', { session: false }),
  param('id').isMongoId().withMessage('param must be id'),
  body('comment').notEmpty().withMessage('field cannot be empty'),
  body('date').isDate().withMessage('field mast be date'),
  validationMiddlevare,
  CommentController.CreateComment)
router.get('/comments/:id',
  param('id').isMongoId().withMessage('param must be id'),
  validationMiddlevare,
  CommentController.GetComments)

router.get('/user_mark/:id',
  passport.authenticate('jwt', { session: false }),
  param('id').isMongoId().withMessage('param must be id'),
  validationMiddlevare,
  markController.getUserMark)
router.get('/marks_post/:id',
  param('id').isMongoId().withMessage('param must be id'),
  validationMiddlevare,
  markController.getmarkpost)
router.post('/mark/:mark/:id',
  passport.authenticate('jwt', { session: false }),
  param('mark').custom(value => {
    if (Number(value) === 0 || Number(value) === 1) return true
  }).withMessage('mark must be 0 or 1'),
  param('id').isMongoId().withMessage('param must be id'),
  validationMiddlevare,
  markController.grade)

router.get('/profile_info', passport.authenticate('jwt', { session: false }), userController.ProfileInformation);
router.put('/nick',
  passport.authenticate('jwt', { session: false }),
  body('nick').notEmpty().withMessage('field cannot be empty'),
  validationMiddlevare,
  userController.updateNick);
router.put('/email',
  passport.authenticate('jwt', { session: false }),
  body('email').notEmpty().withMessage('field cannot be empty'),
  validationMiddlevare,
  userController.updateEmail);
router.post('/upload',
  passport.authenticate('jwt', { session: false }),
  fileMiddleware.single('picture'),
  userController.addFoto)


module.exports = router
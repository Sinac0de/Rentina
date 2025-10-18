const express = require('express');
const { 
  getBlogs, 
  getBlogById, 
  getBlogBySlug,
  createBlog, 
  updateBlog, 
  deleteBlog,
  getFeaturedBlogs,
  getBlogCategories
} = require('../controllers/blogController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protect, admin, createBlog);

router.route('/featured')
  .get(getFeaturedBlogs);

router.route('/categories')
  .get(getBlogCategories);

router.route('/slug/:slug')
  .get(getBlogBySlug);

router.route('/:id')
  .get(getBlogById)
  .put(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog);

module.exports = router;
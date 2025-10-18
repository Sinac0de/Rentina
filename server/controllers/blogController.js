const Blog = require('../models/Blog');
const asyncHandler = require('express-async-handler');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * pageSize;
  
  // Build filter object
  const filter = {};
  
  // Filter by published status
  if (req.query.published !== undefined) {
    filter.published = req.query.published === 'true';
  } else {
    // By default, only show published blogs
    filter.published = true;
  }
  
  // Filter by category
  if (req.query.category) {
    filter.category = req.query.category;
  }
  
  // Filter by featured
  if (req.query.featured !== undefined) {
    filter.featured = req.query.featured === 'true';
  }
  
  // Search by title or content
  if (req.query.search) {
    filter.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { content: { $regex: req.query.search, $options: 'i' } },
      { excerpt: { $regex: req.query.search, $options: 'i' } }
    ];
  }
  
  // Build sort object
  let sort = { createdAt: -1 }; // Default sort by newest
  
  if (req.query.sort) {
    switch (req.query.sort) {
      case 'oldest':
        sort = { createdAt: 1 };
        break;
      case 'popular':
        sort = { views: -1 };
        break;
      case 'featured':
        sort = { featured: -1, createdAt: -1 };
        break;
    }
  }
  
  const totalBlogs = await Blog.countDocuments(filter);
  const blogs = await Blog.find(filter)
    .populate('author', 'name avatar')
    .sort(sort)
    .limit(pageSize)
    .skip(skip);
  
  res.json({
    blogs,
    page,
    pages: Math.ceil(totalBlogs / pageSize),
    total: totalBlogs
  });
});

// @desc    Get blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate('author', 'name email avatar bio');
  
  if (blog) {
    // Increment view count
    blog.views += 1;
    await blog.save();
    
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Get blogs by slug
// @route   GET /api/blogs/slug/:slug
// @access  Public
const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug })
    .populate('author', 'name email avatar bio');
  
  if (blog) {
    // Increment view count
    blog.views += 1;
    await blog.save();
    
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, image, tags, category, published, featured, slug } = req.body;
  
  const blog = new Blog({
    title,
    content,
    excerpt,
    image,
    tags,
    category,
    published: published || false,
    featured: featured || false,
    slug,
    author: req.user._id
  });
  
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, image, tags, category, published, featured, slug } = req.body;
  
  const blog = await Blog.findById(req.params.id);
  
  if (blog) {
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.excerpt = excerpt || blog.excerpt;
    blog.image = image || blog.image;
    blog.tags = tags || blog.tags;
    blog.category = category || blog.category;
    blog.published = published !== undefined ? published : blog.published;
    blog.featured = featured !== undefined ? featured : blog.featured;
    blog.slug = slug || blog.slug;
    
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  
  if (blog) {
    await blog.remove();
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Get featured blogs
// @route   GET /api/blogs/featured
// @access  Public
const getFeaturedBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ featured: true, published: true })
    .populate('author', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(5);
  
  res.json(blogs);
});

// @desc    Get blog categories with counts
// @route   GET /api/blogs/categories
// @access  Public
const getBlogCategories = asyncHandler(async (req, res) => {
  const categories = await Blog.aggregate([
    { $match: { published: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  res.json(categories);
});

module.exports = {
  getBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getFeaturedBlogs,
  getBlogCategories
};
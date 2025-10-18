# Car Rental API Documentation

This document provides comprehensive documentation for the Car Rental API, showcasing the backend features implemented for this professional portfolio project.

## Overview

The Car Rental API is a RESTful web service built with Node.js, Express, and MongoDB that provides comprehensive functionality for a car rental platform. It includes features for car management, user authentication, blog content, favorites system, and analytics.

## Key Features Implemented

### 1. Paginated and Filterable Cars List
- Advanced filtering by make, model, category, year, price, fuel type, transmission, and capacity
- Pagination with configurable page size
- Multiple sorting options (price, year, rating)
- Search functionality across car attributes
- Performance optimized with database indexing

### 2. Blog System
- Full CRUD operations for blog posts
- Content management with titles, slugs, excerpts, and featured images
- Category and tag organization
- Publication control (draft/published status)
- Featured posts management
- View counting for popularity tracking

### 3. User Favorites System
- Personalized car collections for each user
- Simple add/remove favorite functionality
- Quick favorite status checking
- Integration with user profiles

### 4. Additional Professional Features
- Global search across cars and blogs
- Statistics and analytics endpoints
- Enhanced user profiles with avatar, bio, location, and phone
- Comprehensive error handling
- Role-based access control
- JWT-based authentication

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Cars
- `GET /api/cars` - Get all cars with pagination and filtering
- `POST /api/cars` - Create a new car (Admin only)
- `GET /api/cars/:id` - Get a specific car
- `PUT /api/cars/:id` - Update a car (Admin only)
- `DELETE /api/cars/:id` - Delete a car (Admin only)
- `GET /api/cars/categories` - Get car categories with counts
- `GET /api/cars/makes` - Get car makes with counts
- `GET /api/cars/favorites` - Get user's favorite cars
- `POST /api/cars/:id/favorite` - Add car to favorites
- `DELETE /api/cars/:id/favorite` - Remove car from favorites

### Blogs
- `GET /api/blogs` - Get all blogs with pagination and filtering
- `POST /api/blogs` - Create a new blog (Admin only)
- `GET /api/blogs/:id` - Get a specific blog
- `GET /api/blogs/slug/:slug` - Get a blog by slug
- `PUT /api/blogs/:id` - Update a blog (Admin only)
- `DELETE /api/blogs/:id` - Delete a blog (Admin only)
- `GET /api/blogs/featured` - Get featured blogs
- `GET /api/blogs/categories` - Get blog categories with counts

### Favorites
- `GET /api/favorites` - Get user's favorite cars
- `POST /api/favorites/:id` - Add car to favorites
- `DELETE /api/favorites/:id` - Remove car from favorites
- `GET /api/favorites/check/:id` - Check if car is in favorites

### Search
- `GET /api/search` - Global search across cars and blogs
- `GET /api/search/cars` - Search cars with advanced filtering

### Statistics
- `GET /api/stats/dashboard` - Get dashboard statistics
- `GET /api/stats/cars` - Get car statistics

## Filtering and Pagination Examples

### Car Filtering
```bash
# Get SUVs between $50-$100 per day
GET /api/cars?category=SUV&minPrice=50&maxPrice=100

# Get available automatic cars with search
GET /api/cars?transmission=Automatic&availability=true&search=Toyota

# Get paginated results (page 2, 10 items per page)
GET /api/cars?page=2&pageSize=10

# Sort by price low to high
GET /api/cars?sort=price-low
```

### Blog Filtering
```bash
# Get featured news articles
GET /api/blogs?category=News&featured=true

# Search blogs with pagination
GET /api/blogs?search=rental&page=1&pageSize=5

# Sort by popularity
GET /api/blogs?sort=popular
```

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
  "data": {...},
  "message": "Success message"
}
```

### Paginated Response
```json
{
  "cars": [...],
  "page": 1,
  "pages": 5,
  "total": 45
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

## Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling (ODM) library
- **JSON Web Tokens (JWT)** - Authentication mechanism
- **Bcrypt.js** - Password hashing
- **Dotenv** - Environment variable management

## Portfolio Project Highlights

This backend implementation demonstrates:

1. **Full-Stack Development Skills** - Complete RESTful API design and implementation
2. **Database Design** - Proper data modeling with relationships and indexing
3. **Authentication & Security** - JWT-based auth with role-based access control
4. **API Design Best Practices** - Consistent endpoints, proper HTTP methods, error handling
5. **Performance Optimization** - Pagination, filtering, and database indexing
6. **Code Organization** - Modular structure with controllers, models, and routes
7. **Documentation** - Comprehensive API documentation
8. **Feature-Rich Functionality** - Multiple integrated systems (cars, blogs, favorites, search)

This project showcases professional backend development skills suitable for a developer portfolio, demonstrating both technical competency and attention to real-world application requirements.
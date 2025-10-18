# Car Rental API Server

This is the backend API server for the Car Rental application. It provides a comprehensive RESTful API for managing cars, users, bookings, blogs, and favorites.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Car Management**: Full CRUD operations for cars with advanced filtering and pagination
- **Blog System**: Complete blog functionality with categories, tags, and featured posts
- **Favorites System**: Users can save their favorite cars
- **Search Functionality**: Global search across cars and blogs
- **Statistics Dashboard**: Analytics endpoints for admin dashboard
- **Responsive API**: Well-structured endpoints with proper error handling

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

## Filtering and Pagination

### Car Filtering
Cars can be filtered using query parameters:
- `make` - Filter by car make
- `model` - Filter by car model
- `category` - Filter by car category
- `minYear`/`maxYear` - Filter by year range
- `minPrice`/`maxPrice` - Filter by price range
- `fuel` - Filter by fuel type
- `transmission` - Filter by transmission type
- `capacity` - Filter by seating capacity
- `availability` - Filter by availability status
- `search` - Search by make or model

### Pagination
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 12)

### Sorting
- `sort` - Sort order:
  - `price-low` - Price low to high
  - `price-high` - Price high to low
  - `year-new` - Newest cars first
  - `year-old` - Oldest cars first
  - `rating` - Highest rated first

## Blog Filtering
Blogs can be filtered using query parameters:
- `category` - Filter by category
- `published` - Filter by published status
- `featured` - Filter by featured status
- `search` - Search by title or content
- `sort` - Sort order:
  - `newest` - Newest first (default)
  - `oldest` - Oldest first
  - `popular` - Most viewed first
  - `featured` - Featured first

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here
```

## Installation

1. Clone the repository
2. Navigate to the server directory: `cd server`
3. Install dependencies: `npm install`
4. Create a `.env` file with your configuration
5. Start the server: `npm run dev` (development) or `npm start` (production)

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Cors for cross-origin resource sharing

## License

This project is licensed under the MIT License.
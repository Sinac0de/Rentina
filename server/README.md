# Car Rental API Server

This is the backend API server for the Car Rental application.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js for password hashing

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. The server will start on `http://localhost:5000`

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (requires authentication)

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Create a new car (requires admin authentication)
- `PUT /api/cars/:id` - Update a car (requires admin authentication)
- `DELETE /api/cars/:id` - Delete a car (requires admin authentication)

### Bookings
- `POST /api/bookings` - Create a new booking (requires authentication)
- `GET /api/bookings/mybookings` - Get logged in user's bookings (requires authentication)

## Folder Structure

- `config/` - Database configuration
- `controllers/` - Request handlers
- `middleware/` - Custom middleware functions
- `models/` - MongoDB models
- `routes/` - API routes
- `index.js` - Entry point
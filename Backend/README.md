# AlistoPH Backend

Backend API server for the AlistoPH disaster management application.

## Features

- ✅ REST API for disaster alerts
- ✅ User authentication and authorization (JWT)
- ✅ Community posts with likes and comments
- ✅ Weather data integration (ready for API integration)
- ✅ Emergency locations (hotlines, evacuation centers)
- ✅ AWS integration (S3, SNS, SES)
- ✅ MongoDB database with Mongoose
- ✅ Express.js server with security middleware

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Cloud Services**: AWS (S3, SNS, SES)
- **Security**: Helmet, CORS, bcryptjs

## Setup Instructions

### 1. Install Dependencies

```bash
cd Backend
npm install
```

### 2. Environment Variables

Copy `env.example` to `.env` and fill in your configuration:

```bash
cp env.example .env
```

Required environment variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_REGION` - AWS region (default: ap-southeast-1)

### 3. Database Setup

#### Option A: Local MongoDB
Install MongoDB locally and run:
```bash
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### 4. AWS Setup

1. Create an AWS account
2. Create an IAM user with permissions for:
   - S3 (for file uploads)
   - SNS (for push notifications)
   - SES (for emails)
3. Create an S3 bucket for file storage
4. Update AWS credentials in `.env`

### 5. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Alerts
- `GET /api/alerts` - Get all alerts
- `GET /api/alerts/:id` - Get single alert
- `POST /api/alerts` - Create alert (Protected)
- `PUT /api/alerts/:id` - Update alert (Admin/Moderator)
- `DELETE /api/alerts/:id` - Delete alert (Admin/Moderator)

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post (Protected)
- `POST /api/posts/:id/like` - Like/Unlike post (Protected)

### Weather
- `GET /api/weather` - Get weather information

### Locations
- `GET /api/locations` - Get emergency locations

## Project Structure

```
Backend/
├── config/
│   ├── database.js      # MongoDB connection
│   └── aws.js           # AWS configuration
├── models/
│   ├── User.js          # User model
│   ├── Alert.js         # Alert model
│   └── Post.js          # Post model
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── alerts.js        # Alert routes
│   ├── posts.js         # Post routes
│   ├── weather.js       # Weather routes
│   └── locations.js     # Location routes
├── middleware/
│   └── auth.js           # Authentication middleware
├── server.js            # Main server file
└── package.json         # Dependencies
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Helmet.js for security headers
- CORS configuration
- Input validation with express-validator
- Protected routes with role-based access control

## Next Steps

- [ ] Integrate real weather API (OpenWeatherMap)
- [ ] Add image upload functionality with S3
- [ ] Implement push notifications with SNS
- [ ] Add email verification with SES
- [ ] Set up automated testing
- [ ] Add rate limiting
- [ ] Implement caching
- [ ] Add API documentation (Swagger)

## License

ISC

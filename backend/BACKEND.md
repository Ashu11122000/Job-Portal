# Job Portal Backend Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
4. [Environment Variables](#environment-variables)
5. [Database Seeding](#database-seeding)
6. [API Endpoints](#api-endpoints)
7. [Authentication](#authentication)
8. [File Upload](#file-upload)
9. [Error Handling](#error-handling)
10. [Development](#development)
11. [Deployment](#deployment)

---

## 📖 Overview

The Job Portal Backend is a Node.js/Express application built with MongoDB as the database. It follows the MVC (Model-View-Controller) architecture with an additional Repository pattern for data access and Service layer for business logic.

**Key Features:**
- JWT-based authentication
- Role-based access control (Admin, Recruiter, Candidate)
- Job listing and management
- Application tracking
- Company management
- Notification system
- Analytics dashboard
- File upload capability
- Rate limiting and security middleware

**Tech Stack:**
- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: MongoDB 8.x
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **File Upload**: multer
- **Security**: helmet, cors, rate-limiter
- **Logging**: morgan

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── index.js               # Entry point
│   ├── server.js              # Server initialization
│   ├── seed.js                # Database seeding script
│   ├── config/                # Configuration files
│   │   ├── index.js
│   │   ├── db.js              # MongoDB connection
│   │   ├── cloudinary.js      # Image upload service
│   │   └── logger.js          # Logging utility
│   ├── constants/             # Application constants
│   │   ├── roles.js
│   │   ├── statusCodes.js
│   │   ├── messages.js
│   │   ├── jobs.js            # Sample job data
│   │   └── companies.js       # Sample company data
│   ├── controllers/           # Request handlers
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── companyController.js
│   │   ├── applicationController.js
│   │   ├── userController.js
│   │   ├── notificationController.js
│   │   └── analyticsController.js
│   ├── middleware/            # Express middleware
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   ├── roleMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/                # MongoDB schemas
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Company.js
│   │   ├── Application.js
│   │   ├── Notification.js
│   │   ├── ActivityLog.js
│   │   └── index.js
│   ├── routes/                # API route definitions
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── companyRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── userRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── analyticsRoutes.js
│   ├── services/              # Business logic layer
│   │   ├── authService.js
│   │   ├── jobService.js
│   │   ├── applicationService.js
│   │   ├── companyService.js
│   │   ├── userService.js
│   │   ├── notificationService.js
│   │   ├── analyticsService.js
│   │   └── emailService.js
│   ├── repositories/          # Data access layer
│   │   ├── jobRepository.js
│   │   ├── applicationRepository.js
│   │   ├── companyRepository.js
│   │   ├── userRepository.js
│   │   └── notificationRepository.js
│   ├── utils/                 # Utility functions
│   │   ├── apiResponse.js
│   │   ├── catchAsync.js
│   │   ├── errorResponse.js
│   │   ├── emailTemplates.js
│   │   ├── generateToken.js
│   │   └── hashPassword.js
│   ├── loaders/               # Module loaders
│   │   ├── express.js
│   │   ├── routes.js
│   │   └── swagger.js
│   └── tests/                 # Test files
│       ├── unit/
│       └── integration/
├── package.json
├── .env                       # Environment variables (not in git)
└── BACKEND.md                 # This file
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ashu11122000/Job-Portal.git
   cd Job-Portal/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Environment Variables](#environment-variables))

5. **Start the server**
   ```bash
   # Development mode (with hot reload)
   npm run dev

   # Production mode
   npm start
   ```

   The server should start on `http://localhost:5000`

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```env
# Server Configuration
NODE_ENV=dev                    # 'dev' or 'prod'
PORT=5000

# Database Configuration
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/jobportal?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRY=7d

# Email Configuration (optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Cloudinary Configuration (optional)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS and email links)
FRONTEND_URL=http://localhost:3000
```

### MongoDB Setup

1. Create a MongoDB database
2. Pre-create two collections: `jobs` and `companies`
3. Ensure your MONGO_URI includes the database name

---

## 🌱 Database Seeding

The backend uses `src/seed.js` to populate the MongoDB database with sample data.

### Sample Data Files

- `constants/jobs.js` - Job listings sample data
- `constants/companies.js` - Company information sample data

### Running the Seed

You can seed data using either of these commands:

```bash
# Using node directly
node src/seed.js

# Using npm script
npm run seed
```

**What Gets Seeded:**
- Clears existing Company and Job data
- Inserts sample companies from `constants/companies.js`
- Inserts sample jobs from `constants/jobs.js`
- Logs progress and confirmation messages

### Important Notes

- The seed script will **delete existing data** before inserting new data
- Make sure your database connection is configured before seeding
- Sample data includes realistic job titles, descriptions, and company information

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

**POST** `/auth/register`
- Register a new user
- Body: `{ name, email, password, role }`
- Response: User data and JWT token

**POST** `/auth/login`
- Login a user
- Body: `{ email, password }`
- Response: User data and JWT token

### Job Endpoints

**GET** `/jobs`
- Get all jobs (public)
- Response: Array of jobs with company and creator details

**GET** `/jobs/:id`
- Get a single job by ID (public)
- Response: Job details with populated references

**POST** `/jobs`
- Create a new job (recruiter/admin only)
- Headers: `Authorization: Bearer {token}`
- Body: `{ title, description, company, location, salaryRange, jobType, experienceLevel }`

**PUT** `/jobs/:id`
- Update a job (creator or admin only)
- Headers: `Authorization: Bearer {token}`
- Body: Job fields to update

**DELETE** `/jobs/:id`
- Delete a job (creator or admin only)
- Headers: `Authorization: Bearer {token}`

### Company Endpoints

**GET** `/companies`
- Get all companies (public)

**GET** `/companies/:id`
- Get a single company (public)

**POST** `/companies`
- Create a new company (recruiter/admin only)
- Headers: `Authorization: Bearer {token}`
- Body: `{ name, description, website, location, industry, size }`

**PUT** `/companies/:id`
- Update a company

**DELETE** `/companies/:id`
- Delete a company

### Application Endpoints

**POST** `/applications`
- Submit a job application (candidate only)
- Headers: `Authorization: Bearer {token}`
- Body: `{ jobId, coverLetter }`

**GET** `/applications`
- Get applications (recruiter sees their job's applications, candidate sees their own)
- Headers: `Authorization: Bearer {token}`

**GET** `/applications/:id`
- Get application details

**PUT** `/applications/:id/status`
- Update application status (recruiter/admin only)
- Headers: `Authorization: Bearer {token}`
- Body: `{ status }` - status can be: Applied, Under Review, Shortlisted, Rejected, Hired

**DELETE** `/applications/:id`
- Delete an application

### User Endpoints

**GET** `/users/profile`
- Get current user profile
- Headers: `Authorization: Bearer {token}`

**PUT** `/users/profile`
- Update user profile
- Headers: `Authorization: Bearer {token}`
- Body: `{ name, phone, avatar, skills, resume }`

**GET** `/users`
- Get all users (admin only)
- Headers: `Authorization: Bearer {token}`

### Notification Endpoints

**GET** `/notifications`
- Get user notifications
- Headers: `Authorization: Bearer {token}`

**PUT** `/notifications/:id/read`
- Mark notification as read
- Headers: `Authorization: Bearer {token}`

**DELETE** `/notifications/:id`
- Delete a notification
- Headers: `Authorization: Bearer {token}`

### Analytics Endpoints

**GET** `/analytics`
- Get dashboard analytics (admin only)
- Headers: `Authorization: Bearer {token}`
- Response: Job stats, application stats, user stats

**GET** `/analytics/jobs`
- Get job statistics

**GET** `/analytics/applications`
- Get application statistics

---

## 🔐 Authentication

### JWT Token

The application uses JWT (JSON Web Tokens) for authentication.

**Token Structure:**
```javascript
{
  id: "user_id",
  role: "candidate|recruiter|admin"
}
```

**Token Expiry:** 7 days (configurable via JWT_EXPIRY)

### Using the Token

Include the token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

### Roles and Permissions

| Role | Permissions |
|------|------------|
| **admin** | Full access to all endpoints |
| **recruiter** | Create/edit jobs, view applications, create companies |
| **candidate** | View jobs, apply for jobs, manage applications, update profile |

---

## 📤 File Upload

### Upload Endpoints

Currently, file uploads are configured in the middleware but not exposed through specific endpoints. To add file upload functionality:

1. Use `uploadImage` middleware for profile pictures
2. Use `uploadResume` middleware for resume uploads
3. Use `uploadMultiple` middleware for multiple files

### Example Implementation

```javascript
import { uploadResume } from './middleware/uploadMiddleware.js';
import { protect } from './middleware/authMiddleware.js';

app.post('/api/upload/resume', protect, uploadResume.single('resume'), (req, res) => {
  res.json({ file: req.file });
});
```

### File Limits

- **Images**: 5MB max
- **Resumes**: 10MB max
- **Supported formats**: 
  - Images: JPEG, PNG, GIF, WebP
  - Documents: PDF, DOC, DOCX

---

## ⚠️ Error Handling

### Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

### Common Error Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

### Error Handling Middleware

The `errorHandler` middleware automatically catches:
- Mongoose validation errors
- MongoDB duplicate key errors
- JWT errors
- Cast errors
- Custom ErrorResponse errors

---

## 🛠️ Development

### Running in Development Mode

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when files change.

### Code Structure Best Practices

1. **Controllers**: Handle request validation and response
2. **Services**: Contain business logic
3. **Repositories**: Handle database queries
4. **Models**: Define MongoDB schemas
5. **Routes**: Define API endpoints
6. **Middleware**: Handle cross-cutting concerns

### Adding a New Endpoint

1. Create a controller method in `controllers/`
2. Create a route in `routes/`
3. Register the route in `loaders/routes.js`
4. Test the endpoint

### Database Models

All models use Mongoose with the following structure:

```javascript
const schema = new mongoose.Schema({
  field: {
    type: Type,
    required: [true, "Error message"],
    // other validations
  }
}, { timestamps: true });
```

---

## 🚢 Deployment

### Preparing for Production

1. Set `NODE_ENV=prod`
2. Use a production MongoDB URI
3. Set a strong JWT_SECRET
4. Configure all email settings if needed
5. Set up Cloudinary for image uploads (optional)

### Environment for Production

```env
NODE_ENV=prod
PORT=5000
MONGO_URI=<production_mongodb_uri>
JWT_SECRET=<very_strong_secret_key>
```

### Running in Production

```bash
npm start
```

### Performance Considerations

1. **Rate Limiting**: Configured with express-rate-limiter
2. **Compression**: Gzip compression enabled
3. **Helmet**: Security headers configured
4. **CORS**: Configured for frontend URL
5. **Database Indexing**: Ensure MongoDB indexes are created

### Monitoring

Monitor the following in production:
- API response times
- Error rates
- Database connection pool
- Memory usage
- Disk space (for file uploads)

---

## 📝 Additional Notes

### Logging

- Development: Uses morgan for HTTP request logging
- Production: Consider integrating Winston or similar

### Testing

Test files are in `src/tests/`:
- `unit/`: Unit tests for services and utilities
- `integration/`: Integration tests for API endpoints

Run tests (when configured):
```bash
npm test
```

### Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token expiration
- Rate limiting on auth endpoints
- Helmet for security headers
- CORS configuration
- Input validation on all routes

### Rate Limiting

- **General**: 100 requests per 15 minutes per IP
- **Auth**: 5 requests per 15 minutes per IP
- **Password Reset**: 3 requests per hour per IP

---

## 📞 Support & Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Check MONGO_URI format
- Ensure database name is included
- Verify network access in MongoDB Atlas

**Token Expired**
- The token expires after 7 days
- User needs to login again to get a new token

**CORS Error**
- Ensure FRONTEND_URL is set correctly in .env
- Frontend URL must match the allowed origin

**Port Already in Use**
- Change PORT in .env
- Or kill the process using port 5000

---

## 📚 References

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)

---

**Last Updated**: December 6, 2025  
**Version**: 1.0.0

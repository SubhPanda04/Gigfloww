# Gigfloww - HR Management System

A modern HR management system built with React (frontend) and Node.js/Express (backend) for managing employees, hiring, salaries, and dashboard analytics.

## 🏗️ Project Structure

```
Gigfloww/
├── backend/                    # Node.js/Express API server
│   ├── config/
│   │   └── db.js              # MongoDB connection configuration
│   ├── controllers/           # Business logic handlers
│   │   ├── auth.js           # Authentication logic
│   │   ├── dashboard.js      # Dashboard metrics
│   │   ├── hiring.js         # Job posting management
│   │   ├── people.js         # Employee management
│   │   ├── salary.js         # Salary management
│   │   └── user.js           # User management
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication middleware
│   │   └── errorHandler.js   # Global error handling
│   ├── models/               # MongoDB schemas
│   │   ├── Dashboard.js
│   │   ├── Job.js
│   │   ├── People.js
│   │   ├── Salary.js
│   │   └── User.js
│   ├── routes/               # API route definitions
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── hiringRoutes.js
│   │   ├── peopleRoutes.js
│   │   ├── salaryRoutes.js
│   │   └── userRoutes.js
│   ├── scripts/
│   │   └── seedDatabase.js   # Database seeding script
│   ├── utils/
│   │   └── validate.js       # Input validation utilities
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── server.js             # Main server entry point
│
└── frontend/                  # React application
    ├── public/               # Static assets
    ├── src/
    │   ├── components/       # Reusable UI components
    │   │   ├── ui/          # Shadcn/ui components
    │   │   └── Navbar/      # Navigation component
    │   ├── pages/           # Page components
    │   │   ├── Dashboard/
    │   │   ├── People/
    │   │   ├── Hiring/
    │   │   └── Salary/
    │   ├── services/        # API service functions
    │   │   ├── dashboardService.js
    │   │   ├── peopleService.jsx
    │   │   ├── salaryService.jsx
    │   │   └── hiringService.js
    │   ├── lib/             # Utility libraries
    │   └── main.jsx         # React app entry point
    ├── components.json       # Shadcn/ui configuration
    ├── package.json
    ├── tailwind.config.js    # Tailwind CSS configuration
    └── vite.config.js        # Vite build configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Gigfloww
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Create .env file in backend directory
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```env
   # backend/.env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/gigfloww
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```

5. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Create frontend environment file:**
   ```bash
   # Create .env file in frontend directory
   VITE_API_URL=http://localhost:5000/api
   ```

### Database Setup

1. **Start MongoDB** (if running locally)

2. **Seed the database with dummy data:**
   ```bash
   cd backend
   npm run seed
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/register    # Register new user
POST /api/auth/login       # User login
GET  /api/auth/me          # Get current user (protected)
```

### People Management
```
GET    /api/people         # Get all employees
POST   /api/people         # Create new employee
PUT    /api/people/:id     # Update employee
DELETE /api/people/:id     # Delete employee
GET    /api/people/count   # Get employee count
GET    /api/people/stats   # Get employee statistics
```

### Salary Management
```
GET /api/salaries          # Get all salary records
POST /api/salaries         # Create salary record
PUT /api/salaries/status   # Update salary status
```

### Job/Hiring Management
```
GET    /api/hiring         # Get all jobs
POST   /api/hiring         # Create new job posting
PUT    /api/hiring/:id     # Update job posting
DELETE /api/hiring/:id     # Delete job posting
GET    /api/hiring/stats   # Get job statistics
```

### Dashboard
```
GET /api/dashboard/metrics # Get dashboard metrics
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - UI component library
- **Lucide React** - Icon library
- **React Router** - Client-side routing

## 📁 Key Features

### 1. Employee Management
- Add, edit, delete employees
- Track employee details (name, email, job title, department, salary)
- Employee lifecycle management
- Search and filter functionality

### 2. Salary Management
- View salary information for all employees
- Update salary status (Paid/Pending)
- Salary breakdown with deductions and bonuses
- Monthly salary tracking

### 3. Job Posting & Hiring
- Create and manage job postings
- Track applications and candidates
- Job status management (Active/Draft/Closed)
- Application statistics

### 4. Dashboard Analytics
- Real-time employee count
- Hiring statistics
- Performance reports
- Upcoming actions and meetings

## 🔧 Development Guidelines

### Code Style
- Use ES6+ features
- Follow consistent naming conventions
- Add proper error handling
- Include JSDoc comments for functions

### API Response Format
```javascript
// Success Response
{
  success: true,
  data: {...},
  message: "Operation successful"
}

// Error Response
{
  success: false,
  error: "Error message",
  message: "Detailed error description"
}
```

### Database Schema Examples

**Employee Schema:**
```javascript
{
  name: String,
  email: String,
  jobTitle: String,
  department: String,
  salary: Number,
  startDate: Date,
  lifeCycle: String,
  status: String
}
```

**Job Schema:**
```javascript
{
  title: String,
  department: String,
  location: String,
  employmentType: String,
  salaryRange: String,
  description: String,
  status: String,
  applicants: Number
}
```

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### API Testing
Use tools like Postman or Thunder Client to test API endpoints:
- Import the API collection (if available)
- Set up environment variables
- Test all CRUD operations

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build the application
3. Deploy to services like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy to Vercel, Netlify, or similar platforms

### Environment Variables for Production
```env
# Backend Production
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/gigfloww
JWT_SECRET=your_production_jwt_secret

# Frontend Production
VITE_API_URL=https://your-api-domain.com/api
```

## 🐛 Common Issues & Solutions

### 1. CORS Issues
- Ensure CORS is properly configured in `server.js`
- Check that frontend URL is allowed in CORS settings

### 2. Database Connection
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure network access (for cloud MongoDB)

### 3. API Endpoint Not Found
- Check route definitions in `routes/` directory
- Verify controller function names
- Ensure routes are registered in `server.js`

### 4. Authentication Issues
- Check JWT token format
- Verify middleware is applied to protected routes
- Ensure token is sent in Authorization header

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 🔐 Security Considerations

- Never commit `.env` files
- Use strong JWT secrets
- Validate all user inputs
- Implement rate limiting
- Use HTTPS in production
- Sanitize database queries

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check existing documentation
- Review API endpoints and responses

## 📄 License

This project is licensed under the ISC License.
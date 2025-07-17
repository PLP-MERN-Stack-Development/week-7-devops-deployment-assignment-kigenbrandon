# MERN Bug Tracker with Testing & Debugging

A comprehensive bug tracking application built with the MERN stack, featuring extensive testing coverage and advanced debugging capabilities.

## 🚀 Features

### Core Functionality
- **Bug Management**: Create, read, update, and delete bug reports
- **Advanced Filtering**: Filter by status, severity, priority, and search functionality
- **Real-time Statistics**: Dashboard with bug metrics and status overview
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Testing & Quality Assurance
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API endpoint testing with real database operations
- **Error Boundaries**: React error boundaries for graceful error handling
- **Input Validation**: Client and server-side validation with sanitization
- **Security**: XSS protection, rate limiting, and CORS configuration

### Debugging Features
- **Comprehensive Logging**: Console logging throughout the application
- **Error Tracking**: Detailed error reporting and stack traces
- **Development Tools**: Chrome DevTools integration
- **API Monitoring**: Request/response logging with timestamps

## 🛠️ Technology Stack

### Frontend
- **React 18** with functional components and hooks
- **Tailwind CSS** for styling and responsive design
- **Lucide React** for icons
- **Vitest** for unit and integration testing
- **React Testing Library** for component testing

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **Jest** for unit and integration testing
- **Supertest** for HTTP assertion testing
- **MongoDB Memory Server** for isolated testing

### Security & Performance
- **Helmet.js** for security headers
- **Express Rate Limiter** for API protection
- **CORS** configuration
- **Input sanitization** and validation
- **Error handling middleware**

## 📋 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn package manager

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mern-bug-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

4. **Start MongoDB**
   ```bash
   # For local MongoDB
   mongod
   
   # Or use MongoDB Atlas (update MONGODB_URI in .env)
   ```

5. **Run the application**
   ```bash
   # Development mode (runs both client and server)
   npm run dev
   
   # Or run separately
   npm run client:dev  # Frontend only
   npm run server:dev  # Backend only
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run client tests only
npm run test:client

# Run server tests only
npm run test:server

# Run tests in watch mode
npm run test:client:watch
npm run test:server:watch

# Generate coverage reports
npm run test:coverage
```

### Test Coverage Goals
- **Unit Tests**: 80%+ coverage for utilities and components
- **Integration Tests**: All API endpoints covered
- **Error Scenarios**: All error paths tested

### Test Structure

```
src/
├── __tests__/
│   ├── components/          # React component tests
│   │   ├── BugList.test.jsx
│   │   └── BugForm.test.jsx
│   └── services/            # Service layer tests
│       └── bugService.test.js
server/
└── tests/
    ├── unit/                # Unit tests
    │   └── validation.test.js
    └── integration/         # API integration tests
        └── bugs.test.js
```

## 🐛 Debugging Guide

### Development Debugging

1. **Console Logging**
   - Check browser console for frontend logs
   - Monitor server terminal for backend logs
   - All API requests/responses are logged with emojis for easy identification

2. **Chrome DevTools**
   - **Network Tab**: Monitor API calls and responses
   - **React DevTools**: Inspect component state and props
   - **Console**: View application logs and errors

3. **Server Debugging**
   ```bash
   # Use Node.js inspector
   node --inspect server/src/server.js
   
   # Or with nodemon
   nodemon --inspect server/src/server.js
   ```

### Common Issues & Solutions

1. **Database Connection Errors**
   ```bash
   # Check MongoDB status
   sudo systemctl status mongod
   
   # Restart MongoDB
   sudo systemctl restart mongod
   ```

2. **CORS Errors**
   - Ensure frontend URL matches CORS_ORIGIN in .env
   - Check that server is running on correct port

3. **Test Failures**
   ```bash
   # Clear test database
   npm run test:server -- --clearCache
   
   # Run specific test file
   npm run test:server -- bugs.test.js
   ```

### Error Boundary Testing

The application includes React Error Boundaries. To test them:

1. **Trigger a JavaScript error in a component**
2. **Check that the error boundary UI appears**
3. **Verify error is logged to console**
4. **Test the "Try Again" functionality**

## 📁 Project Structure

```
mern-bug-tracker/
├── src/                     # React frontend
│   ├── components/          # React components
│   │   ├── BugList.jsx
│   │   ├── BugForm.jsx
│   │   ├── BugStats.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── LoadingSpinner.jsx
│   ├── services/            # API service layer
│   │   └── bugService.js
│   ├── __tests__/           # Frontend tests
│   └── App.tsx              # Main app component
├── server/                  # Express backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   └── config/          # Configuration files
│   └── tests/               # Backend tests
├── coverage/                # Test coverage reports
└── README.md
```

## 🚦 API Endpoints

### Bug Management
- `GET /api/bugs` - Get all bugs (with filtering and pagination)
- `GET /api/bugs/:id` - Get specific bug
- `POST /api/bugs` - Create new bug
- `PUT /api/bugs/:id` - Update bug
- `DELETE /api/bugs/:id` - Delete bug

### Health Check
- `GET /api/health` - Server health status

### Query Parameters
- `status`: Filter by bug status (open, in-progress, resolved, closed)
- `severity`: Filter by severity (low, medium, high, critical)
- `priority`: Filter by priority (low, medium, high)
- `page`: Pagination page number
- `limit`: Items per page

## 🔒 Security Features

- **Input Sanitization**: XSS protection on all user inputs
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for specific origin
- **Security Headers**: Helmet.js for security headers
- **Validation**: Server-side data validation
- **Error Handling**: Secure error messages (no stack traces in production)

## 📊 Testing Strategy

### Unit Testing
- **React Components**: User interactions, prop handling, rendering
- **Utility Functions**: Input validation, data sanitization
- **Service Functions**: API communication, error handling

### Integration Testing
- **API Endpoints**: CRUD operations with real database
- **Database Operations**: Mongoose model validation
- **Error Scenarios**: Invalid inputs, network failures

### Coverage Reports
- **HTML Reports**: Generated in `coverage/` directory
- **Console Output**: Summary statistics after test runs
- **CI Integration**: Ready for continuous integration

## 🎯 Performance Optimization

- **MongoDB Indexing**: Optimized queries for filtering
- **Pagination**: Efficient data loading
- **Error Boundaries**: Prevents application crashes
- **Input Debouncing**: Optimized search functionality
- **Lazy Loading**: Component-based code splitting ready

## 🔧 Development Tools

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (ready to configure)
- **Nodemon**: Auto-restart development server
- **Concurrently**: Run multiple npm scripts
- **Cross-env**: Cross-platform environment variables

## 📈 Future Enhancements

- [ ] Real-time updates with WebSockets
- [ ] File attachment support
- [ ] User authentication and authorization
- [ ] Email notifications
- [ ] Advanced reporting and analytics
- [ ] Export functionality (PDF, CSV)
- [ ] Comment system for bug discussions
- [ ] Time tracking for bug resolution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Write tests for new functionality
4. Ensure all tests pass (`npm test`)
5. Commit changes (`git commit -am 'Add new feature'`)
6. Push to branch (`git push origin feature/new-feature`)
7. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- MERN stack community for excellent documentation
- Testing libraries maintainers
- MongoDB team for excellent database tools
- Tailwind CSS for beautiful styling system

---

Built with ❤️ for learning and demonstration purposes.
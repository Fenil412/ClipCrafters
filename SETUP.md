# ClipCrafters Setup Guide

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Twilio account (for SMS OTP)
- Resend account (for Email)

## Quick Start

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Configuration

The `.env` files have been created for you:

- `server/.env` - Backend environment variables
- `client/.env` - Frontend environment variables

**Important:** Review and update the following in `server/.env`:
- MongoDB connection string (already configured)
- JWT secrets (change in production!)
- Cloudinary credentials
- Twilio credentials
- Resend API keys

### 3. Start the Application

**Terminal 1 - Start Backend (Port 5001):**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend (Port 5173):**
```bash
cd client
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5001/api
- Health Check: http://localhost:5001/api/health

## Project Structure

```
clipcrafters/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── services/      # API service layer
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Utility functions
│   └── .env              # Frontend environment variables
│
└── server/                # Express backend
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Route controllers
    │   ├── middlewares/  # Express middlewares
    │   ├── models/       # Mongoose models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   ├── utils/        # Utility functions
    │   └── validators/   # Request validators
    └── .env             # Backend environment variables
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/send-otp` - Send OTP via SMS/Email (protected)
- `POST /api/auth/verify-otp` - Verify OTP (protected)

### Projects
- `GET /api/projects` - Get all projects (protected)
- `POST /api/projects` - Create project (protected)
- `GET /api/projects/:id` - Get project by ID (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Videos
- `POST /api/videos/generate` - Generate video (protected)
- `GET /api/videos/:id` - Get video by ID (protected)
- `GET /api/videos?projectId=xxx` - Get videos by project (protected)

### Scenes
- `GET /api/scenes?videoId=xxx` - Get scenes by video (protected)
- `GET /api/scenes/:id` - Get scene by ID (protected)
- `PUT /api/scenes/:id` - Update scene (protected)

### Edits
- `GET /api/edits?sceneId=xxx` - Get edits by scene (protected)
- `GET /api/edits?videoId=xxx` - Get edits by video (protected)

## Features

### Frontend
- Modern React 19 with Vite
- Framer Motion animations
- React Router v7 for routing
- Axios for API calls
- Context API for state management
- Protected routes with authentication
- Command palette (Cmd/Ctrl + K)
- Custom cursor
- Theme toggle (light/dark mode)
- Responsive design

### Backend
- Express.js REST API
- MongoDB with Mongoose
- JWT authentication
- Rate limiting
- File upload with Multer
- Cloudinary integration
- OTP via SMS (Twilio) and Email (Resend)
- Error handling middleware
- Request validation
- Security with Helmet
- CORS configuration
- Compression

## Troubleshooting

### Backend won't start
- Check MongoDB connection string in `server/.env`
- Ensure all required environment variables are set
- Check if port 5001 is available

### Frontend can't connect to backend
- Verify backend is running on port 5001
- Check `client/.env` has correct API URL
- Check browser console for CORS errors

### Authentication issues
- Clear localStorage: `localStorage.clear()`
- Check JWT secrets are set in `server/.env`
- Verify token is being sent in Authorization header

### Database connection issues
- Verify MongoDB Atlas IP whitelist includes your IP
- Check MongoDB connection string format
- Ensure database user has correct permissions

## Development Tips

1. Use `npm run dev` for hot-reload during development
2. Check `/api/health` endpoint to verify backend is running
3. Use browser DevTools Network tab to debug API calls
4. Check server console for detailed error messages
5. Use the command palette (Cmd/Ctrl + K) for quick navigation

## Production Deployment

Before deploying to production:

1. Update all secrets in `server/.env`
2. Set `NODE_ENV=production`
3. Build frontend: `cd client && npm run build`
4. Use process manager like PM2 for backend
5. Set up reverse proxy (nginx/Apache)
6. Enable HTTPS
7. Configure proper CORS origins
8. Set up monitoring and logging

## Support

For issues or questions, please check:
- Server logs in terminal
- Browser console for frontend errors
- MongoDB Atlas logs
- API response messages

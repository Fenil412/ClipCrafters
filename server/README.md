# AI Agentic Video Editing System - Backend

Production-ready Node.js backend with MongoDB and Mongoose for AI-powered video editing.

## Features

- **User Management**: Authentication with JWT, role-based access
- **Project Management**: Multi-user collaboration support
- **Video Generation**: AI-powered video creation with scene-level editing
- **Edit History**: Complete version control and audit trail
- **AI Tracking**: Monitor all AI agent calls and performance metrics
- **File Upload**: Multer-based file handling with validation
- **Security**: Helmet, rate limiting, CORS protection
- **Performance**: Compression, optimized queries, caching
- **Notifications**: SMS (Twilio) and Email (Resend) services
- **OTP Authentication**: Secure 2FA with SMS/Email delivery

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Multer for file uploads
- Axios for FastAPI communication
- Helmet + Rate Limiting for security
- Morgan for logging
- Twilio for SMS notifications
- Resend for email notifications
- ES Modules

## Project Structure

```
server/
├── src/
│   ├── models/
│   │   ├── User.js           # User authentication & profiles
│   │   ├── Project.js        # Video projects
│   │   ├── Video.js          # Generated videos
│   │   ├── Scene.js          # Individual video scenes
│   │   ├── EditHistory.js    # Version control & edits
│   │   ├── AIGeneration.js   # AI agent tracking
│   │   └── index.js          # Model exports
│   ├── config/
│   │   └── database.js       # MongoDB connection
│   └── server.js             # Express app entry point
├── .env.example              # Environment variables template
├── .gitignore
└── package.json
```

## Installation

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
MONGO_URI=mongodb://localhost:27017/ai-video-editing
JWT_SECRET=your_secure_secret_key
FASTAPI_URL=http://localhost:8000
OPENAI_API_KEY=your_openai_key
ELEVENLABS_API_KEY=your_elevenlabs_key
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Run the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My Video Project",
    "description": "AI-generated educational video",
    "sourceType": "research-paper"
  }'
```

### Generate Video
```bash
curl -X POST http://localhost:5000/api/videos/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "projectId": "PROJECT_ID",
    "text": "Your content here...",
    "title": "Introduction to AI"
  }'
```

## Models Overview

### User Model
- Authentication with bcrypt password hashing
- Role-based access (user/admin)
- Project references
- Email indexing for fast lookups

### Project Model
- Multi-user collaboration
- Status tracking (draft/processing/completed)
- Source type support (research-paper, lecture-notes, etc.)
- Owner and collaborator management

### Video Model
- Links to projects
- Generation status tracking
- AI agent version tracking
- Scene references

### Scene Model
- Modular scene-level editing
- AI generation tracking
- Version control
- Confidence scoring
- Source reference tracking

### EditHistory Model
- Complete audit trail
- User and AI edit tracking
- Version management
- Edit type categorization

### AIGeneration Model
- AI agent call tracking
- Performance metrics (tokens, latency)
- Input/output logging
- Success/failure tracking

## Database Indexes

Optimized indexes for common queries:
- User: email
- Project: owner, status, createdAt
- Video: projectId, generationStatus
- Scene: videoId + sceneNumber (unique)
- EditHistory: sceneId, videoId, userId
- AIGeneration: projectId, agentType, status

## API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/me            - Get current user profile
POST   /api/auth/send-otp      - Send OTP via SMS or Email
POST   /api/auth/verify-otp    - Verify OTP and authenticate
POST   /api/auth/resend-otp    - Resend OTP
```

### Projects
```
POST   /api/projects                    - Create new project
GET    /api/projects                    - Get all user projects
GET    /api/projects/:id                - Get project by ID
PUT    /api/projects/:id                - Update project
DELETE /api/projects/:id                - Delete project
POST   /api/projects/:id/collaborators  - Add collaborator
```

### Videos
```
POST   /api/videos/generate    - Generate video from text
POST   /api/videos/upload      - Upload video file
GET    /api/videos/:id         - Get video by ID
GET    /api/videos/:id/scenes  - Get video scenes
```

### Scenes
```
GET    /api/scenes/video/:videoId  - Get scenes by video
GET    /api/scenes/:id             - Get scene by ID
PUT    /api/scenes/:id             - Update scene
DELETE /api/scenes/:id             - Delete scene
```

### Edit History
```
POST   /api/edits                  - Create edit history
GET    /api/edits/scene/:sceneId   - Get scene edit history
GET    /api/edits/video/:videoId   - Get video edit history
GET    /api/edits/user             - Get user edit history
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment mode | development |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/ai-video-editing |
| JWT_SECRET | Secret key for JWT tokens | - |
| JWT_EXPIRES_IN | JWT expiration time | 7d |
| FASTAPI_URL | FastAPI service URL | http://localhost:8000 |
| OPENAI_API_KEY | OpenAI API key | - |
| ELEVENLABS_API_KEY | ElevenLabs API key | - |
| MAX_FILE_SIZE | Max upload file size (bytes) | 100000000 |
| CORS_ORIGIN | Allowed CORS origin | http://localhost:3000 |

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token authentication
- Password excluded from JSON responses
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## Performance Optimizations

- Strategic database indexing
- Compound indexes for complex queries
- Lean queries for read operations
- Connection pooling
- Graceful shutdown handling

## License

MIT

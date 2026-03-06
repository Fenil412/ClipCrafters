<<<<<<< HEAD
# 🎬 ClipCrafters — AI Agentic Video Editing System

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-brightgreen)](https://mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

> Upload research papers, lecture notes, or raw text — ClipCrafters' AI pipeline generates a full video with scenes, voiceovers, and visuals. Every scene is independently editable.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Backend API | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| AI Pipeline | FastAPI (Python) |
| Frontend | React (MERN) |
| Auth | JWT (jsonwebtoken) |
| File Uploads | Multer |
| AI HTTP Client | Axios |
| Security | Helmet + CORS + Rate Limiting |

---

## 📁 Folder Structure

```
server/
├── server.js               # Entry point (connects DB, starts server)
├── .env                    # Local secrets (git-ignored)
├── .env.example            # Template
└── src/
    ├── app.js              # Express app factory
    ├── config/
    │   ├── database.js     # Mongoose connection
    │   └── env.js          # Validated env config
    ├── constants/
    │   └── roles.js
    ├── controllers/        # HTTP layer — thin, delegates to services
    │   ├── auth.controller.js
    │   ├── project.controller.js
    │   ├── video.controller.js
    │   ├── scene.controller.js
    │   └── edit.controller.js
    ├── middlewares/
    │   ├── auth.middleware.js      # JWT protect + RBAC restrictTo
    │   ├── error.middleware.js     # Global error + 404 handler
    │   ├── upload.middleware.js    # Multer disk storage
    │   └── rateLimit.middleware.js # API + auth rate limits
    ├── models/             # Mongoose schemas
    │   ├── User.js
    │   ├── Project.js
    │   ├── Video.js
    │   ├── Scene.js
    │   ├── EditHistory.js
    │   └── AIGeneration.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── project.routes.js
    │   ├── video.routes.js
    │   ├── scene.routes.js
    │   └── edit.routes.js
    ├── services/           # Business logic
    │   ├── auth.service.js
    │   ├── project.service.js
    │   ├── video.service.js
    │   ├── scene.service.js
    │   └── ai.service.js   # FastAPI communication
    ├── utils/
    │   ├── asyncHandler.js
    │   ├── apiResponse.js
    │   └── logger.js
    └── validators/
        ├── auth.validator.js
        └── project.validator.js
=======
# ClipCrafters — Node.js Backend API

> Express.js REST API for the ClipCrafters AI Video Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://mongodb.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Setup & Run](#setup--run)
- [Environment Variables](#environment-variables)
- [All API Endpoints](#all-api-endpoints)
  - [Auth APIs](#1-auth-apis)
  - [Project APIs](#2-project-apis)
  - [Video APIs](#3-video-apis)
  - [Scene APIs](#4-scene-apis)
  - [Edit History APIs](#5-edit-history-apis)
  - [System APIs](#6-system-apis)
- [Request & Response Examples](#request--response-examples)
- [Middlewares](#middlewares)
- [Error Handling](#error-handling)
- [Models](#models)

---

## Overview

This is the backend service for ClipCrafters. It:

- Handles user auth (JWT access + refresh tokens, OTP email verification)
- Manages projects, videos, scenes, and edit history via MongoDB
- Proxies AI generation requests to the FastAPI service
- Stores assets on Cloudinary
- Sends transactional emails via Resend

**Base URL (dev):** `http://localhost:5001/api`

---

## Folder Structure

```
server/
├── server.js                   # Entry point — creates HTTP server
├── src/
│   ├── app.js                  # Express app setup (CORS, middleware, routes)
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── env.js              # Validated env vars
│   ├── constants/
│   │   └── messages.js         # Shared response strings
│   ├── controllers/
│   │   ├── auth.controller.js  # register, login, getMe, sendOtp, verifyOtp
│   │   ├── project.controller.js
│   │   ├── video.controller.js
│   │   ├── scene.controller.js
│   │   └── edit.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js  # JWT protect()
│   │   ├── error.middleware.js # Global error handler + notFound
│   │   ├── rateLimit.middleware.js
│   │   └── upload.middleware.js # Multer for file uploads
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Project.model.js
│   │   ├── Video.model.js
│   │   ├── Scene.model.js
│   │   ├── EditHistory.model.js
│   │   ├── OTP.model.js
│   │   ├── RefreshToken.model.js
│   │   └── AuditLog.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   ├── video.routes.js
│   │   ├── scene.routes.js
│   │   └── edit.routes.js
│   ├── services/
│   │   ├── ai.service.js       # FastAPI calls
│   │   ├── auth.service.js
│   │   ├── cloudinary.service.js
│   │   ├── email.service.js    # Resend
│   │   ├── otp.service.js
│   │   ├── project.service.js
│   │   ├── refreshToken.service.js
│   │   └── video.service.js
│   ├── utils/
│   │   ├── logger.js           # Winston logger
│   │   ├── response.js         # Unified response helpers
│   │   └── token.js            # JWT sign/verify
│   └── validators/
│       ├── auth.validator.js
│       └── project.validator.js
├── package.json
└── .env                        # Not committed — see below
>>>>>>> 76d35d6aef2682511949bd646d8b8cf3812391a4
```

---

<<<<<<< HEAD
## 🚀 Getting Started

### 1. Install dependencies
=======
## Setup & Run

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas URI

### Install
>>>>>>> 76d35d6aef2682511949bd646d8b8cf3812391a4

```bash
cd server
npm install
```

<<<<<<< HEAD
### 2. Configure environment

```bash
cp .env.example .env
# Fill in MONGO_URI, JWT_SECRET, FASTAPI_URL, etc.
```

### 3. Start development server

```bash
npm run dev
```

### 4. Health check

```
GET http://localhost:5000/api/health
=======
### Run

```bash
# Development (hot reload)
npm run dev

# Production
npm start
```

Server starts on **port 5001** (configurable via `PORT` env var).

---

## Environment Variables

Create `server/.env`:

```env
# ── Server ─────────────────────────────────
PORT=5001
NODE_ENV=development

# ── Database ───────────────────────────────
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/clipcrafters

# ── JWT ────────────────────────────────────
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_EXPIRES_IN=7d
ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=7d

# ── Security ───────────────────────────────
BCRYPT_SALT_ROUNDS=10

# ── CORS ───────────────────────────────────
# Accepts any localhost port automatically in dev
# Set explicit origins for production:
# CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com

# ── FastAPI AI Service ──────────────────────
FASTAPI_URL=http://localhost:8000

# ── Cloudinary ─────────────────────────────
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ── Resend Email ───────────────────────────
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=ClipCrafters <no-reply@yourdomain.com>
RESEND_VERIFIED_EMAIL=your_verified@email.com

# ── OTP ────────────────────────────────────
OTP_EXPIRY_MINUTES=5
>>>>>>> 76d35d6aef2682511949bd646d8b8cf3812391a4
```

---

<<<<<<< HEAD
## 📡 API Reference

### Authentication — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ❌ | Create user account |
| POST | `/login` | ❌ | Login, returns JWT |
| GET | `/me` | ✅ | Get own profile |

**Register**
```json
POST /api/auth/register
{
  "name": "Fenil Chodvadiya",
  "email": "fenil@example.com",
  "password": "securePass123"
}
```

**Login**
```json
POST /api/auth/login
{
  "email": "fenil@example.com",
  "password": "securePass123"
}
// Response: { "token": "eyJ...", "user": { ... } }
```

---

### Projects — `/api/projects`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Create a new project |
| GET | `/` | List user's projects (paginated) |
| GET | `/:id` | Get project with videos populated |
| PUT | `/:id` | Update project |
| DELETE | `/:id` | Delete project |

**Create Project**
```json
POST /api/projects/create
Authorization: Bearer <token>
{
  "title": "My Research Paper",
  "description": "Converts paper to video",
  "sourceType": "research-paper"
}
```

---

### Videos — `/api/videos`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/generate` | Submit text → start AI generation |
| POST | `/upload` | Upload file → start AI generation |
| GET | `/:id` | Get video with scenes |

**Generate from text**
```json
POST /api/videos/generate
Authorization: Bearer <token>
{
  "text": "Attention is all you need...",
  "projectId": "64abc...",
  "title": "Attention Paper Video"
}
// Response: 202 Accepted — video stub returned, generation runs async
=======
## All API Endpoints

### 1. Auth APIs

**Base:** `/api/auth`  
Rate limited to **10 requests / 15 min** per IP on login & register.

---

#### `POST /api/auth/register`

Register a new user account.

**Auth required:** No  
**Rate limited:** Yes

**Request Body:**
```json
{
  "name": "Fenil Chodvadiya",
  "email": "fenil@example.com",
  "password": "SecurePass@123"
}
```

**Success Response `201`:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Fenil Chodvadiya",
      "email": "fenil@example.com",
      "isVerified": false,
      "createdAt": "2026-03-05T18:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- `400` — Validation failed (missing/invalid fields)
- `409` — Email already registered
- `429` — Too many requests

---

#### `POST /api/auth/login`

Login with email and password.

**Auth required:** No  
**Rate limited:** Yes

**Request Body:**
```json
{
  "email": "fenil@example.com",
  "password": "SecurePass@123"
}
```

**Success Response `200`:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Fenil Chodvadiya",
      "email": "fenil@example.com"
    }
  }
}
```

**Error Responses:**
- `400` — Validation failed
- `401` — Invalid credentials
- `429` — Rate limited

---

#### `GET /api/auth/me`

Get the currently authenticated user's profile.

**Auth required:** ✅ `Authorization: Bearer <token>`

**Success Response `200`:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Fenil Chodvadiya",
      "email": "fenil@example.com",
      "isVerified": true
    }
  }
}
>>>>>>> 76d35d6aef2682511949bd646d8b8cf3812391a4
```

---

<<<<<<< HEAD
### Scenes — `/api/scenes`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/video/:videoId` | Get all scenes ordered by sceneNumber |
| PUT | `/:sceneId` | Edit a scene (auto-records EditHistory) |

**Update Scene**
```json
PUT /api/scenes/:sceneId
Authorization: Bearer <token>
{
  "editType": "script",
  "scriptText": "Updated narration text here."
=======
#### `POST /api/auth/send-otp`

Send a 6-digit OTP to the user's email for verification.

**Auth required:** ✅  
**Rate limited:** Yes

**Success Response `200`:**
```json
{
  "success": true,
  "message": "OTP sent to your email"
>>>>>>> 76d35d6aef2682511949bd646d8b8cf3812391a4
}
```

---

<<<<<<< HEAD
### Edit History — `/api/edits`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Manually log an edit |
| GET | `/scene/:sceneId` | Get full edit history for a scene |

---

## 🔐 Authentication

All protected routes require:
```
Authorization: Bearer <JWT_TOKEN>
```

Token is returned on `/api/auth/login` and `/api/auth/register`.

---

## 🛡️ Security Features

- **Helmet** — HTTP security headers
- **CORS** — Origin-whitelisted via `CORS_ORIGIN` env var
- **Rate Limiting** — 100 req/15min globally, 10 req/15min on auth routes
- **JWT** — Stateless auth, `select: false` on passwords
- **Input Validation** — Schema-based validators before controllers

---

## 🤖 AI Pipeline

```
User Input
  ↓
POST /api/videos/generate
  ↓
Video stub created (status: processing)
  ↓
[Background] FastAPI /generate-script
  ↓
[Background] FastAPI /generate-scenes
  ↓
Scenes saved to DB
  ↓
Video status → completed
  ↓
Every AI call logged in AIGeneration collection
=======
#### `POST /api/auth/verify-otp`

Verify the OTP sent to email.

**Auth required:** ✅

**Request Body:**
```json
{
  "otp": "482951"
}
```

**Success Response `200`:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
>>>>>>> 76d35d6aef2682511949bd646d8b8cf3812391a4
```

---

<<<<<<< HEAD
## 📦 Environment Variables

See `.env.example` for the full list.

| Variable | Required | Description |
|---|---|---|
| `MONGO_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret for signing tokens |
| `FASTAPI_URL` | ✅ | AI service base URL |
| `PORT` | ❌ | Server port (default: 5000) |
| `CORS_ORIGIN` | ❌ | Allowed frontend origin |
| `MAX_FILE_SIZE` | ❌ | Upload size limit in bytes |
=======
### 2. Project APIs

**Base:** `/api/projects`  
**Auth required:** ✅ All routes

---

#### `POST /api/projects/create`

Create a new video project.

**Request Body:**
```json
{
  "title": "My Product Demo",
  "topic": "A 60-second explainer about our SaaS analytics platform",
  "style": "professional",
  "duration": 60
}
```

**Success Response `201`:**
```json
{
  "success": true,
  "data": {
    "project": {
      "_id": "65f2b3c4d5e6f7a8b9c0d2e3",
      "userId": "65f1a2b3c4d5e6f7a8b9c0d1",
      "title": "My Product Demo",
      "topic": "A 60-second explainer...",
      "status": "draft",
      "createdAt": "2026-03-05T18:00:00.000Z"
    }
  }
}
```

---

#### `GET /api/projects`

Get all projects belonging to the authenticated user.

**Success Response `200`:**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "_id": "65f2b3c4d5e6f7a8b9c0d2e3",
        "title": "My Product Demo",
        "status": "draft",
        "videoId": null,
        "createdAt": "2026-03-05T18:00:00.000Z"
      }
    ],
    "total": 1
  }
}
```

---

#### `GET /api/projects/:id`

Get a single project by ID.

**Success Response `200`:**
```json
{
  "success": true,
  "data": {
    "project": { ... }
  }
}
```

**Error:** `404` if not found or not owned by user.

---

#### `PUT /api/projects/:id`

Update a project's title, topic, or style.

**Request Body (partial):**
```json
{
  "title": "Updated Title",
  "status": "processing"
}
```

---

#### `DELETE /api/projects/:id`

Permanently delete a project and its associated video/scenes.

**Success Response `200`:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

### 3. Video APIs

**Base:** `/api/videos`  
**Auth required:** ✅ All routes

---

#### `POST /api/videos/generate`

Trigger AI video generation for a project. Calls FastAPI internally.

**Request Body:**
```json
{
  "projectId": "65f2b3c4d5e6f7a8b9c0d2e3"
}
```

**Success Response `200`:**
```json
{
  "success": true,
  "data": {
    "video": {
      "_id": "65f3c4d5e6f7a8b9c0d3e4f5",
      "projectId": "65f2b3c4d5e6f7a8b9c0d2e3",
      "status": "processing",
      "scenes": [
        {
          "_id": "65f4d5e6f7a8b9c0d4e5f6a7",
          "order": 1,
          "script": "Welcome to our analytics dashboard...",
          "visualPrompt": "Modern dark UI showing charts and graphs"
        }
      ]
    }
  }
}
```

---

#### `POST /api/videos/upload`

Upload an existing video file (multipart/form-data).

**Content-Type:** `multipart/form-data`  
**Form Field:** `sourceFile` (video file, max 10MB)

**Success Response `201`:**
```json
{
  "success": true,
  "data": {
    "video": {
      "_id": "65f3c4d5e6f7a8b9c0d3e4f5",
      "cloudinaryUrl": "https://res.cloudinary.com/...",
      "status": "uploaded"
    }
  }
}
```

---

#### `GET /api/videos/:id`

Get video details including processing status, scenes, and Cloudinary URL.

**Success Response `200`:**
```json
{
  "success": true,
  "data": {
    "video": {
      "_id": "65f3c4d5e6f7a8b9c0d3e4f5",
      "status": "completed",
      "cloudinaryUrl": "https://res.cloudinary.com/...",
      "duration": 62,
      "scenes": [ ... ]
    }
  }
}
```

---

### 4. Scene APIs

**Base:** `/api/scenes`  
**Auth required:** ✅ All routes

---

#### `GET /api/scenes/video/:videoId`

Fetch all scenes for a given video, ordered by scene number.

**Success Response `200`:**
```json
{
  "success": true,
  "data": {
    "scenes": [
      {
        "_id": "65f4d5e6f7a8b9c0d4e5f6a7",
        "videoId": "65f3c4d5e6f7a8b9c0d3e4f5",
        "order": 1,
        "script": "Welcome to ClipCrafters...",
        "visualPrompt": "Futuristic AI interface",
        "audioUrl": "https://res.cloudinary.com/.../audio.mp3",
        "clipUrl": "https://res.cloudinary.com/.../scene1.mp4",
        "status": "completed"
      }
    ]
  }
}
```

---

#### `PUT /api/scenes/:sceneId`

Update a scene's script or visual prompt (triggers re-generation if needed).

**Request Body:**
```json
{
  "script": "Updated script text for this scene",
  "visualPrompt": "Bright modern office with people collaborating"
}
```

---

### 5. Edit History APIs

**Base:** `/api/edits`  
**Auth required:** ✅ All routes

---

#### `POST /api/edits/create`

Record an edit action performed on a scene.

**Request Body:**
```json
{
  "sceneId": "65f4d5e6f7a8b9c0d4e5f6a7",
  "changeType": "script_update",
  "before": { "script": "Old script text" },
  "after": { "script": "New script text" }
}
```

---

#### `GET /api/edits/scene/:sceneId`

Get full edit history for a specific scene (undo/redo support).

**Success Response `200`:**
```json
{
  "success": true,
  "data": {
    "edits": [
      {
        "_id": "65f5e6f7a8b9c0d5e6f7a8b9",
        "sceneId": "65f4d5e6f7a8b9c0d4e5f6a7",
        "changeType": "script_update",
        "before": { "script": "Old script" },
        "after": { "script": "New script" },
        "createdAt": "2026-03-05T18:30:00.000Z"
      }
    ]
  }
}
```

---

### 6. System APIs

---

#### `GET /api/health`

Server health check — no auth required.

**Response `200`:**
```json
{
  "success": true,
  "message": "ClipCrafters API is running",
  "timestamp": "2026-03-05T18:00:00.000Z",
  "uptime": 3600,
  "environment": "development"
}
```

---

## Request & Response Examples

### Using curl

```bash
# Register
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test@1234"}'

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@1234"}'

# Get projects (replace TOKEN)
curl http://localhost:5001/api/projects \
  -H "Authorization: Bearer TOKEN"

# Create project
curl -X POST http://localhost:5001/api/projects/create \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Video","topic":"Explain machine learning in 60 seconds"}'

# Generate video
curl -X POST http://localhost:5001/api/videos/generate \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"projectId":"PROJECT_ID_HERE"}'
```

### Using JavaScript (Axios)

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: { Authorization: `Bearer ${localStorage.getItem('cc_token')}` }
});

// Create project
const { data } = await api.post('/projects/create', {
  title: 'My Video',
  topic: 'Explain AI to beginners'
});

// Generate video
await api.post('/videos/generate', { projectId: data.data.project._id });
```

---

## Middlewares

| Middleware | Purpose |
|---|---|
| `protect` | Verifies JWT, attaches `req.user` |
| `authLimiter` | 10 req / 15 min on auth routes |
| `apiLimiter` | 100 req / 15 min globally |
| `upload` | Multer for `multipart/form-data` |
| `globalErrorHandler` | Catches all thrown errors, returns standard JSON |
| `notFound` | Returns `404` for unknown routes |

---

## Error Handling

All errors follow this schema:

```json
{
  "success": false,
  "message": "Human readable error message",
  "errors": [ "Optional array of field-level validation errors" ]
}
```

| Status | Meaning |
|---|---|
| `400` | Bad request / validation failed |
| `401` | Unauthenticated (missing/invalid token) |
| `403` | Forbidden (not owner of resource) |
| `404` | Resource not found |
| `409` | Conflict (e.g. duplicate email) |
| `429` | Too many requests |
| `500` | Internal server error |

---

## Models

### User
```
_id, name, email, password (bcrypt), isVerified, refreshToken, createdAt
```

### Project
```
_id, userId (ref User), title, topic, style, duration, status, videoId (ref Video), createdAt
```

### Video
```
_id, projectId, userId, status (pending|processing|completed|failed),
cloudinaryUrl, duration, scenes (ref Scene[]), createdAt
```

### Scene
```
_id, videoId, order, script, visualPrompt,
audioUrl, clipUrl, status, createdAt
```

### EditHistory
```
_id, sceneId, userId, changeType, before, after, createdAt
```
>>>>>>> 76d35d6aef2682511949bd646d8b8cf3812391a4

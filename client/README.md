# ClipCrafters Frontend

Modern, production-ready frontend for the AI Agentic Video Editing System.

## Tech Stack

- **React 19** with Vite
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **React Router DOM** for routing
- **Axios** for API calls
- **Sonner** for toast notifications
- **Lucide React** for icons

## Features

✨ Beautiful SaaS-style UI with modern design
🎨 Dark/Light theme support
🔐 Protected routes with authentication
📱 Fully responsive (mobile-first)
🎭 Smooth animations with Framer Motion
🎯 3D hover effects and glassmorphism
⚡ Optimized performance with lazy loading

## Getting Started

### Prerequisites

- Node.js 16+ installed
- Backend API running on `http://localhost:5001`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:5001/api
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── services/        # API service functions
├── utils/           # Utility functions
├── styles/          # Global styles
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

## Available Routes

- `/` - Home page (public)
- `/login` - Login page (public)
- `/register` - Register page (public)
- `/dashboard` - User dashboard (protected)
- `/projects/create` - Create new project (protected)
- `/projects/:id` - Project details (protected)
- `/editor/:id` - Video editor (protected)
- `/profile` - User profile (protected)

## Key Features

### Authentication Flow
- JWT token stored in localStorage
- Automatic token refresh
- Protected routes redirect to login
- Session persistence

### Theme System
- Light and dark mode
- Smooth transitions
- Persistent preference
- System preference detection

### Animations
- Page transitions
- Hover effects
- Modal animations
- Loading states
- 3D card effects

### Responsive Design
- Mobile-first approach
- Collapsible sidebar
- Hamburger menu
- Adaptive layouts

## Design System

### Colors

**Light Theme:**
- Background: #F8FAFC
- Primary: #4F46E5
- Accent: #06B6D4
- Text: #1F2937

**Dark Theme:**
- Background: #0F172A
- Primary: #6366F1
- Accent: #22D3EE
- Text: #E5E7EB

### Typography
- Display: Poppins
- Body: Inter

## Development

### Code Style
- Functional components only
- React hooks for state management
- Context API for global state
- Axios interceptors for API calls

### Performance
- Lazy loaded routes
- Memoized components
- Optimized re-renders
- Code splitting

## Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

## License

MIT

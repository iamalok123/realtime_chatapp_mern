# Realtime Chat Application (MERN Stack)

A modern, full-featured realtime chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io for real-time communication.

## Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Secure HTTP-only cookies
  - Password hashing with bcrypt

- 💬 **Real-time Messaging**
  - Instant message delivery using Socket.io
  - Online/offline user status
  - Message history

- 🖼️ **Media Support**
  - Profile picture upload
  - Image sharing in chats
  - Cloudinary integration for media storage

- 🎨 **Modern UI/UX**
  - Responsive design with Tailwind CSS
  - DaisyUI components
  - Dark/Light theme support
  - Smooth animations

- ⚡ **Performance & Security**
  - Optimized for production deployment
  - CORS protection
  - XSS protection with HTTP-only cookies
  - Input validation

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS & DaisyUI** - Styling
- **Zustand** - State management
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **React Router** - Navigation
- **React Hot Toast** - Notifications

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **Socket.io** - WebSocket communication
- **JWT** - Authentication
- **Cloudinary** - Media storage
- **bcryptjs** - Password hashing

## Setup & Installation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup and deployment instructions.

### Quick Start (Local Development)

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Realtime_Chatapp_MERN
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## Environment Variables

### Backend (.env)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_*` - Cloudinary credentials
- `FRONTEND_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## Deployment

**Important**: Due to Socket.io's WebSocket requirements:
- ✅ Deploy **Backend** to Railway or Render (supports WebSockets)
- ✅ Deploy **Frontend** to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

## Project Structure

```
Realtime_Chatapp_MERN/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middlewares/     # Auth middleware
│   ├── lib/             # Utilities (DB, Socket.io, Cloudinary)
│   └── index.js         # Entry point
└── frontend/
    └── src/
        ├── components/  # React components
        ├── pages/       # Page components
        ├── store/       # Zustand stores
        └── lib/         # Utilities
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

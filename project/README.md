# MN STUDIO Quotes - Professional Quotes Website

A modern, responsive quotes website with user authentication, social features, and admin management.

## Features

- 🔐 **User Authentication**: Email/password and Google OAuth integration
- 📱 **Responsive Design**: Mobile-first approach with modern UI
- 💝 **Social Features**: Like, save, and share quotes with animations
- 🎯 **Admin Panel**: Content management and quote scheduling
- 🔍 **Search & Filter**: Find quotes by category, author, or keywords
- 📊 **SEO Optimized**: Meta tags, sitemap, and structured data
- ⚡ **Performance**: Fast loading with optimized images

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sign-In API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Copy the Client ID

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## Google OAuth Setup Guide

### Step 1: Create Google Cloud Project
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Click "New Project" or select existing project
3. Enable the "Google Sign-In API"

### Step 2: Configure OAuth Consent Screen
1. Go to "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - App name: "MN STUDIO Quotes"
   - User support email: your email
   - Developer contact: your email

### Step 3: Create OAuth Credentials
1. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
2. Choose "Web application"
3. Add authorized origins:
   - `http://localhost:5173` (for development)
   - `https://yourdomain.com` (for production)
4. Copy the Client ID

### Step 4: Update Environment Variables
```env
VITE_GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
```

## Admin Access

Use `admin@mnstudio.com` with any password for admin features, or sign in with Google using an admin email.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Google OAuth 2.0
- **Build Tool**: Vite
- **Deployment**: Netlify ready

## Project Structure

```
src/
├── components/          # React components
├── contexts/           # React contexts (Auth, Quotes)
├── types/             # TypeScript type definitions
├── index.css          # Global styles and animations
└── App.tsx            # Main application component
```

## Features Overview

### Authentication System
- Email/password registration and login
- Google OAuth integration with profile pictures
- Secure session management
- Admin role detection

### Quote Management
- Browse quotes by category
- Search functionality
- Like, save, and share features
- Social media sharing integration
- Admin content management

### Design Features
- Professional color scheme
- Smooth animations and transitions
- Mobile-responsive layout
- SEO optimization
- Fast loading performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
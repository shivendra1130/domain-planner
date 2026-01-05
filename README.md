# Domain Planner

A React application with Firebase Authentication for managing domains.

## Features

- ✅ Firebase Authentication (Email & Password)
- ✅ Protected Routes
- ✅ Clean UI with Framer Motion animations
- ✅ Dark theme design

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd domain-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication > Email/Password
   - Enable Firestore Database
   - Copy your Firebase config

4. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase credentials:
     ```
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   - Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── services/
│   └── firebase.js          # Firebase initialization
├── auth/
│   ├── Login.jsx            # Login component
│   ├── Signup.jsx           # Signup component
│   └── auth.css             # Auth styling
├── routes/
│   └── ProtectedRoute.jsx   # Route protection
├── pages/
│   └── DomainPage.jsx       # Main app page
├── App.jsx                  # App routing
└── main.jsx                 # Entry point
```

## Tech Stack

- React 18
- Firebase 10
- React Router v6
- Framer Motion
- Vite

## License

MIT

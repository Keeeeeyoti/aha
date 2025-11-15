# Aha - Conversation Game App

Aha is a fun and engaging conversation game designed for local multiplayer on a single device. This app is built using **Expo for Web**, **React Native Web**, and **Supabase**.

## Features
- **Home Screen**: Start the game or view profile options.
- **Level Selection**: Choose between Green, Yellow, and Red decks.
- **Add Players**: Add, reorder, and delete player names.
- **Game Session**: Swipe through prompts and take turns answering.
- **Session End**: Minimal end screen with replay options.

## Tech Stack
- **Frontend**: React Native Web (Expo for Web)
- **Backend**: Supabase (for future versions)
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js
- Expo CLI

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Deployment
1. Set up environment variables for Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Deploy to Vercel:
   ```bash
   vercel deploy
   ```

## Folder Structure
```
Aha/
├── src/
│   ├── screens/          # App screens
│   ├── state/            # State management
│   ├── data/             # Static JSON data
│   └── supabase/         # Supabase client setup
├── App.js                # Main app entry point
└── README.md             # Project documentation
```

## License
MIT License
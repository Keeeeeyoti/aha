# Copilot Instructions for Aha Project

## Overview
The Aha project is a conversation game app designed for local multiplayer on a single device. It uses **Expo for Web**, **React Native Web**, and **Supabase** for its architecture. The app is deployed on **Vercel**.

### Key Components
1. **Frontend**:
   - Built with React Native Web via Expo for Web.
   - Screens are located in `src/screens/`.
   - State management is handled in `src/state/sessionState.js`.
   - Static JSON data for prompts is stored in `src/data/prompts.json`.

2. **Backend**:
   - Supabase is prepared for future versions (currently read-only).
   - Supabase client setup is in `src/supabase/supabaseClient.js`.

3. **Deployment**:
   - Configured for Vercel with `vercel.json`.
   - CSP settings are adjusted for development (`unsafe-eval` allowed).

### Folder Structure
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

## Developer Workflows
### Build and Run
- **Start Development Server**:
  ```bash
  npm run web
  ```
  This launches the Expo development server for web testing.

- **Deploy to Vercel**:
  ```bash
  vercel deploy
  ```

### Debugging
- Add `console.log` statements in `App.js` or screen components to verify rendering.
- Use browser developer tools to inspect CSP issues or blank screens.

### Testing
- Ensure navigation works correctly between screens.
- Verify state updates (e.g., adding/removing players).

## Project-Specific Conventions
- **State Management**:
  - Use `useSessionState` from `src/state/sessionState.js` for managing session data.
  - Avoid direct manipulation of state; use provided methods (e.g., `addPlayer`, `nextTurn`).

- **Prompt Handling**:
  - Prompts are loaded from `src/data/prompts.json`.
  - Ensure prompts are filtered to avoid repeats during a session.

- **Navigation**:
  - Screens are registered in `App.js` using `createStackNavigator`.
  - Initial route is set to `Home`.

## Integration Points
- **Supabase**:
  - Environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) must be set for backend integration.
  - Currently used for client setup only.

- **CSP Settings**:
  - Development requires `unsafe-eval` in CSP (`vercel.json` or `<meta>` tag in `index.html`).

## Known Issues
- **CSP Blocking `eval`**:
  - Update CSP settings in `vercel.json` or add a `<meta>` tag in `index.html`.

- **Blank Screens**:
  - Check navigation setup in `App.js`.
  - Verify rendering of individual screens (e.g., `HomeScreen`).


## User preferences
- please do not ask users to manually update code changes unless absolutely necessary. Change the code then asks for user approval.
---
Feel free to update this file as the project evolves.
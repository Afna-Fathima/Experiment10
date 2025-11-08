Implementation notes and next steps:

- Firebase Auth:
  - Replace placeholders in src/firebase.js with your project's VITE_ env variables.
  - Implement signUp / signIn flows using firebase/auth in src/pages/Login.jsx.
  - Protect routes with auth state (React context or higher-order component).

- Uploads:
  - Use Firebase Storage to upload audio and cover images.
  - Save metadata to Firestore in collections 'podcasts' and 'episodes'.

- Playback resume:
  - Save playback position in Firestore under users/{uid}/playbackProgress.

- RSS:
  - Option A: Create an Express endpoint `/rss/:podcastId` that reads data and returns XML.
  - Option B: Use Firebase Cloud Functions to generate and host RSS.

- Security rules:
  - Storage: allow read to public, write only to authenticated users.
  - Firestore: restrict writes so only creators may modify their podcasts.


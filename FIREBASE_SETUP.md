# Firebase Setup

1. Create a Firebase project.
2. Add a Web App and copy its config into `firebase-config.js`.
3. Enable Authentication > Email/Password.
4. Create this user:
   - Email: `sunnietattooart@sunnie-menu.com`
   - Password: `İhsaniyeSunnie16`
5. Enable Firestore Database.
6. Copy `firestore.rules` into Firestore Rules and publish.
7. Open the site, go to `Restoran girişi`, log in with:
   - Username: `sunnietattooart`
   - Password: `İhsaniyeSunnie16`

The first successful login seeds the current menu to Firestore if it does not exist yet.

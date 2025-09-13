
# Jotish React Assignment - scaffold

## What this contains
- React + Vite scaffold with 4+ screens:
  - Login (credentials: testuser / Test123)
  - List (fetches from API with POST; fallback sample data if API fails)
  - Details (shows item and provides camera capture)
  - Photo Result (shows captured photo)
  - Bar Chart (Recharts) and Map (Leaflet) screens as additional features

## How to run (Windows)
1. Install Node.js (>= 18) and npm.
2. Open terminal in the project folder.
3. Run:
   ```
   npm install
   npm run dev
   ```
4. Open `http://localhost:5173` (or the port Vite suggests).

## Notes about the API
The assignment PDF specifies POST JSON to:
https://backend.jotish.in/backend_dev/gettabledata.php
If you open that URL in a browser it may respond with a JSON error like:
{"ErrorDescription":"Bad REQUEST_METHOD","Error":400}
This happens because the server expects a POST request with a JSON body. The app sends the POST as shown in `src/api.js`. If the server rejects the request, the app displays sample fallback data so you can still test the UI.

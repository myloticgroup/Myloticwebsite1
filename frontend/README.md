# Frontend

This is the React + Vite frontend for the project.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Local URLs

- Development: http://localhost:5173
- Preview: http://localhost:4173

## Environment

Copy `.env.example` to `.env` and update values as needed:

```env
VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
```

For local development, use `VITE_API_URL=http://localhost:5000/api`.

## Render deployment

- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Add `VITE_API_URL` to the Render environment with the deployed backend URL ending in `/api`.
- Add a Render rewrite from `/*` to `/index.html` with status `200` so direct navigation and reloads work with `BrowserRouter`.

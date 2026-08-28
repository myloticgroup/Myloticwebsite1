# Myloticwebsite1

This project contains a full-stack JavaScript setup with two independent applications:

- Frontend: React + Vite
- Backend: Node.js + Express

## Project structure

```text
project-root/
├── frontend/
├── backend/
├── .gitignore
└── README.md
```

## Frontend setup

The frontend app is a React + Vite application that serves the UI on port 5173.

- App entry: `frontend/src/main.jsx`
- Routes: `frontend/src/App.jsx`
- API service: `frontend/src/services/api.js`
- Public assets: `frontend/public/`
- Environment example: `frontend/.env.example`

## Backend setup

The backend app is a Node.js + Express API that serves JSON responses on port 5000.

- App entry: `backend/src/app.js`
- Server entry: `backend/src/server.js`
- Routes: `backend/src/routes/`
- Environment example: `backend/.env.example`

The backend requires MongoDB for persistent production data. Without `MONGODB_URI`, the app can start for limited local development, but data uses in-memory fallback storage and is not persistent.

Admin access uses provisioned email/password accounts, bcrypt password hashes, and HTTP-only session cookies. Create the first Admin from the backend with `npm run create-admin` after setting `ADMIN_BOOTSTRAP_EMAIL`, `ADMIN_BOOTSTRAP_PASSWORD`, and `ADMIN_BOOTSTRAP_NAME` in `backend/.env`. There is no public Admin registration.

## Installation commands

```bash
cd frontend
npm install

cd ../backend
npm install
```

## Development commands

Frontend:

```bash
cd frontend
npm run dev
```

Backend:

```bash
cd backend
npm run dev
```

## Frontend URL

http://localhost:5173

## Backend URL

http://localhost:5000

## Health-check endpoint

```text
http://localhost:5000/health
```

The backend health endpoint returns:

```json
{
  "success": true,
  "status": "ok"
}
```

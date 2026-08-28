# Backend

This is the Express backend for the project. MongoDB is required for persistent production data; without `MONGODB_URI`, the app uses limited in-memory fallback storage that is lost on restart.

## Scripts

```bash
npm install
npm run dev
npm start
npm run create-admin
```

## Local URL

- API: http://localhost:5000
- Health check: http://localhost:5000/health

## Environment

Copy `.env.example` to `.env` and update values as needed:

```env
PORT=5000
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=
UPLOADS_DIR=public/uploads
ADMIN_BOOTSTRAP_EMAIL=
ADMIN_BOOTSTRAP_PASSWORD=
ADMIN_BOOTSTRAP_NAME=
```

Create the first Admin only with `npm run create-admin`. Admin login uses the provisioned email and bcrypt-hashed password, then creates an HTTP-only session cookie. There is no public Admin registration or API-key authentication.

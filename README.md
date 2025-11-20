TinyLink – URL Shortener (MERN Stack)

TinyLink is a lightweight and clean URL-shortening web application, inspired by Bitly.
Users can create short URLs, track clicks, view analytics, and manage links.
The project is fully MERN based, with a secure backend and a polished React frontend.

🔗 Live Demo

Frontend: https://tinylink-fi947n4lw-surjeet-kumars-projects.vercel.app

Backend: https://tinylink-p8qb.onrender.com

✨ Features
🔧 Core Features

Create short URLs

Optional custom short code

URL validation

Check redirect stats

Track click count

Track last clicked time

Delete links

Auto-generated unique codes

API-driven interface

Clean, responsive UI

🌐 Public Routes
Route	Description
/	Dashboard (Create + List Links)
/code/:code	Stats page
/:code	Redirection
/healthz	Health check
🏗️ Technologies Used
⚡ Frontend

React

Redux Toolkit

Axios

Tailwind CSS

Heroicons

Vercel Deployment

Vite

🛠 Backend

Node.js + Express

MongoDB + Mongoose

Helmet, CORS, Compression

Rate Limiting

Winston Logging

Render Deployment

📦 API Endpoints
Method	Path	Description
POST	/api/links	Create a short link
GET	/api/links	Get all links
GET	/api/links/:code	Get stats for a specific link
DELETE	/api/links/:code	Delete link
GET	/:code	Redirect to target URL
Response Example
{
  "code": "abc123",
  "target": "https://google.com",
  "short_url": "https://yourdomain.com/abc123",
  "clicks": 0,
  "created_at": "2025-01-01"
}

🛠️ Environment Variables

Create .env files for frontend and backend.

Backend .env
MONGO_URI=your_mongodb_uri
BASE_URL=https://tinylink-p8qb.onrender.com
CORS_ORIGIN=https://tinylink-fi947n4lw-surjeet-kumars-projects.vercel.app

Frontend .env
VITE_API_BASE_URL=https://tinylink-p8qb.onrender.com
VITE_BASE_URL=http://localhost:3000

▶️ Running Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd tinylink-frontend
npm install
npm run dev

🚀 Deployment
Backend (Render)

Build Command: npm install

Start Command: npm start

Set env variables in Render dashboard

Render automatically assigns PORT

Frontend (Vercel)

Build Command: npm run build

Output Directory: dist

Env variables in Vercel dashboard

📸 Screenshots

<img width="1891" height="897" alt="image" src="https://github.com/user-attachments/assets/3985e816-982c-4e1c-912f-784b85d10545" />




Add your UI screenshots here if needed

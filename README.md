PitchPal 🚀

PitchPal is a modern web application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. It allows users (UGC creators) to generate pitches using AI, save data and research brands in different niche.


Features

User authentication and authorization

CRUD operations for [pitches, posts, etc.]

Responsive React frontend with modern UI

RESTful API built with Node.js & Express

Data persistence using MongoDB Atlas

Production-ready TypeScript backend

Tech Stack

Frontend: React, JavaScript, CSS

Backend: Node.js, Express, TypeScript

Database: MongoDB Atlas

Authentication: JWT

Hosting: Render (backend), Vercel (frontend)

Project Structure
PitchPal/
├── backend/          # Node.js + Express + TypeScript backend
│   ├── dist/         # Compiled JavaScript (after build)
│   ├── server.ts     # Entry point
│   ├── tsconfig.json
│   └── package.json
├── frontend/         # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── package.json      # Main folder (monorepo)

Getting Started

Backend setup
cd backend
npm install
npm run build   # compile TypeScript
npm start       # start backend server

Frontend setup
cd frontend
npm install
npm start       # starts React app on localhost:3000

Deployment

Backend: Deployed on Render

Frontend: Deployed on Vercel

Push to branch (git push origin feature-name)

Create a Pull Request

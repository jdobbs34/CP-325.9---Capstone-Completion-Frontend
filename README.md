# Capstone BookTracker Project - Frontend

## BookTracker App

https://github.com/jdobbs34/CP-325.9---Capstone-Completion-Frontend

https://github.com/jdobbs34/CP-325.9---Capstone-Completion-Backend

## About

A full stack React web application that lets you search for Books from Google, save them to your personal library, and track your read status.

Link to live site =

## Technologies Used

### Frontend

- React
- Vite
- React Router DOM
- Axios
- CSS
- Google API (https://www.googleapis.com)
- MongoDB a.k.a Da Gooooose

### Backend

- Node.js - JavaScript runtime
- Express.js - Web framework
- dotenv - Environment variables
- cors - connects frontend and backend
- Mongoose - ODM (Object Data Modeling)
- MongoDB Atlas - Database

## Approach

### Frontend

The frontend part of this app is built using React hooks to manage state and interact with the DOM:

- useRef — Handles all of the inputs in the form.
- useEffect — This is used for the Google Books API when the user types.
- useState — Holds the books array and is triggered when books are added, edited, or deleted.

The app has 4 pages connected with React Router. All book data is saved to MongoDB, so it continues after a page refresh.

### Backend Routes (CRUD)

- POST - /api/books - Create a new book
- GET - /api/books/ - Get all books
- GET - /api/book/:id - Get one book by ID
- PUT - /api/book/:id - Update a book by ID
- DELETE - /api/book/:id - Delete a book by ID

Route for seed

- GET - /api/book

## How to Run Locally

 ### 1. Clone the repositories
- bash git clone https://github.com/jdobbs34/CP-325.9---Capstone-Completion-Frontend
- bash git clone https://github.com/yourusername/book-tracker-backend

### 2. Set up the backend
- bash cd Capstone.Backend.BookTracker.Project
- bash cd book-tracker-backend
- bash npm install
- Create a .`.env` in file the root of the backend folder: MONGO_URI=your_mongodb_connection_string PORT=5000
- Send the database with sample data: bash npm seed
- Start rthe beckend server: node server.js
- You should see: Server running on port 3000 MongoDB connected

### 3. Set up the frontend
- bash cd Capstone.Frontend.BookTracker.Project
- bash npm install
- bash npm run dev
- Open http://localhost:5173 in your browser.

### 4. Both must be running at the same time
- Frontend Terminal: `npm run dev`
- Backend Terminal: `npm run dev`

## Unsolved Problems

- No user authentication
- Google Books API has limits
- Cover Images sometimes do not load

## Features - How to use the app

Save Books to a personal library

- Filter Books by status — Want to read, reading, finished - **My Books**
- Search Book by title or author using Google API - **Add Books**
- Edit a book's status, rating, and notes - **Edit Books**
- View stats — total books, read counts, average rating - **Stats**
- Delete Books from your list
- Data persists in MongoDB after page refresh
- Sticky navbar
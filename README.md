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

Create

- POST - /api/books - Create a new book
  Read
- GET - /api/books/- Get all books
- GET - /api/book/:id - Get one book by ID
  Update
- PUT - /api/book/:id - Update a book by ID
  Delete
- DELETE - /api/book/:id - Delete a book by ID

Route for seed

- GET - /api/book

## How to Run Locally

- bashgit clone https://github.com/yourusername/your-repo-name
- cd your-repo-name
- npm install
- npm run dev
- Then open http://localhost:5173 in your browser.

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

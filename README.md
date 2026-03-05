# Capstone BookTracker Project - Frontend

## BookTracker App

https://github.com/jdobbs34/CP-325.9---Capstone-Completion-Frontend

https://github.com/jdobbs34/CP-325.9---Capstone-Completion-Backend


## About

A React web application that lets you search for Books from Google, save them to your personal library, and track your read status.

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
I built this app using React hooks to manage state and interact with the DOM:

- useRef — Handles all of the inputs in the form.
- useEffect — This is used for the Google Books API when the user types.
- useState — Holds the characters array and is triggered when characters are added, edited, or deleted.

The app has 4 pages connected with React Router. All character data is saved to localStorage, so it continues after a page refresh.

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

## Features
- Search Book by title or author using Google API
- Save Books to a personal library
- Filter Books by status — Want to read, reading, finished
- Edit a book's status, rating, and notes
- Delete Books from your list
- View stats — total characters, watch counts, average rating
- Data persists in MongoDB after page refresh
- Sticky navbar



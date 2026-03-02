import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookListPage from "./pages/BookListPage";
import AddBookPage from "./pages/AddBookPage";
import BookDetailPage from "./pages/BookDetailPage";
import StatsPage from "./pages/StatsPage";
// import "./App.css";

// useState - hold the books array
function App() {
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem("books");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  // useEffect - save to localStorage whenever books changes
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookListPage books={books} setBooks={setBooks} />} />
        <Route path="/add" element={<AddBookPage setBooks={setBooks} />} />
        <Route path="/book/id" element={<BookDetailPage books={books} setBooks={setBooks} />} />
        <Route path="/stats" element={<StatsPage books={books} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



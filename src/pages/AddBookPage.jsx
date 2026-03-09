import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Function and hooks
export default function AddBookPage({ setBooks }) {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const statusRef = useRef(null);
  const ratingRef = useRef(null);
  const notesRef = useRef(null);
  const searchRef = useRef(null);
  const coverRef = useRef(null);
  const timerRef = useRef(null);
  const errorRef = useRef(null);
  const googleIdRef = useRef("");
  const key = import.meta.env.VITE_GOOGLE_BOOKS_KEY

  // useEffect for search
  useEffect(() => {
    searchRef.current.focus();
  }, []);

  // useEffect for Google API seacrh
  useEffect(() => {
    const input = searchRef.current;

    const handleInput = () => {
      clearTimeout(timerRef.current);
      const query = input.value.trim();

      if (query.length < 2) {
        setResults([]);
        return;
      }

      timerRef.current = setTimeout(async () => {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5&key=${key}`,
        );
        const data = await res.json();
        setResults(data.items || []);
      }, 600);
    };

    input.addEventListener(`input`, handleInput);
    return () => input.removeEventListener("input", handleInput);
  }, []);

  // Select book handler
  const handleSelect = (book) => {
    const info = book.volumeInfo;
    titleRef.current.value = info.title || "";
    authorRef.current.value = info.authors?.[0] || "";
    googleIdRef.current = book.id;
    if (info.imageLinks?.thumbnail) {
      coverRef.current.src = info.imageLinks.thumbnail || "";
      coverRef.current.style.display = "block";
    }
    setResults([]);
    searchRef.current.value = "";
  };

  // Save handler
  const handleSave = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value.trim();
    const author = authorRef.current.value.trim();

    if (!title || !author) {
      errorRef.current.textContent = "Title and author are required";
      errorRef.current.style.display = "block";
      return;
    }

    const newBook = {
      // id: Date.now().toString(),
      title,
      author,
      status: statusRef.current.value,
      rating: ratingRef.current.value ? Number(ratingRef.current.value) : null,
      notes: notesRef.current.value.trim(),
      cover: coverRef.current.src || "",
      googleId: googleIdRef.current,
    };

    try {
      const res = await axios.post(`http://localhost:3000/api/books/`, newBook);
      setBooks((prev) => [res.data, ...prev]);
      navigate("/");
    } catch (error) {
      console.log(error);
      errorRef.current.textContent = "Failed to save book. Try again";
      errorRef.current.style.display = "block";
    }
  };

  const handleSearch = async () => {
    clearTimeout(timerRef.current);
    const query = searchRef.current.value.trim();
    if (query.length < 2) return;
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5&key=${key}`,
    );
    const data = await res.json();
    setResults(data.items || []);
  };

  return (
    <div className="page">
      <h1>Add a Book</h1>

      {/* Search bar */}
      <div className="form-group">
        <label>Search Google Books</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input ref={searchRef} placeholder="Search by title or author..." />
          <button type="button" className="btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div
          style={{
            background: "#aaa",
            border: "1px solid #444",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}>
          {results.map((book) => (
            <div
              key={book.id}
              onClick={() => handleSelect(book)}
              style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem",
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
              }}>
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  style={{ width: "36px", height: "52px", objectFit: "cover" }}
                  alt="cover"
                />
              )}

              <div>
                <h3>{book.volumeInfo.title}</h3>
                <p style={{ color: "#aaa", fontSize: "0.85rem" }}>
                  {book.volumeInfo.authors?.[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <img
        ref={coverRef}
        style={{
          display: "none",
          width: "80px",
          marginBottom: "1rem",
        }}
        alt="cover"
      />

      <form onSubmit={handleSave}>
        <div className="form-grid">
          {/* Adding Book Title */}
          <div className="form-group">
            <label>Title</label>
            <input ref={titleRef} placeholder="Book title" />
          </div>

          {/* Adding Author Name */}
          <div className="form-group">
            <label>Author</label>
            <input ref={authorRef} placeholder="Author name" />
          </div>

          {/* Status dropdwon */}

          <div className="form-group">
            <label>Status</label>
            <select ref={statusRef} defaultValue="want to read">
              <option value="want to read">Want to Read</option>
              <option value="reading">Reading</option>
              <option value="finished">Finished</option>
            </select>
          </div>

          {/* Rating dropdown */}
          <div className="form-group">
            <label>Rating (1-5) </label>
            <select ref={ratingRef} defaultValue="">
              <option value="">No rating</option>
              <option value="1">1⭐</option>
              <option value="2">2⭐⭐</option>
              <option value="3">3⭐⭐⭐</option>
              <option value="4">4⭐⭐⭐⭐</option>
              <option value="5">5⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>

        {/* Comment box */}
        <div className="form-group">
          <label>Notes</label>
          <textarea
            ref={notesRef}
            rows="6"
            placeholder="Your thoughts so far..."></textarea>
        </div>
        <p
          ref={errorRef}
          style={{ display: "none", color: "red", marginBottom: "1rem" }}
        />

        <div className="form-actions">
          <button
            className="btn-cancel"
            type="button"
            onClick={() => navigate("/")}>
            Cancel
          </button>
          <button className="btn-primary" type="button" onClick={handleSave}>
            Save Book
          </button>
        </div>
      </form>
    </div>
  );
}

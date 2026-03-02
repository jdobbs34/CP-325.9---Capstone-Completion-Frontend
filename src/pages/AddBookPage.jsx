import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Function and hooks
export default function AddBookPage({ setBooks }) {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);

  // useRef for all inputs
  const searchRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const statusRef = useRef(null);
  const ratingRef = useRef(null);
  const notesRef = useRef(null);
  const timerRef = useRef(null);
  const errorRef = useRef(null);
  const selectedRef = useRef(null);
  const coverRef = useRef(null);

  // useEffect to cous search on page load
  useEffect(() => {
    searchRef.current.focus();
  }, []);

  // useEffect for Rick and Morty API seacrh
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
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`,
        );
        const data = await res.json();
        setResults(data.results || []);
      }, 400);
    };

    input.addEventListener(`input`, handleInput);
    return () => input.removeEventListener("input", handleInput);
  }, []);

  // Select book handler
  const handleSelect = (book) => {
    const info = book.volumeInfo;
    selectedRef.current = book;
    titleRef.current.value = info.title || "";
    authorRef.current.value = info.authors?.[0] || "";
    if (coverRef.current) {
      coverRef.current.src = info.imageLinks?.thumbnail || "";
      coverRef.current.style.display = info.imageLinks?.thumbnail
        ? "block"
        : "none";
    }
    searchRef.current.value = info.title;
    setResults([]);
  };

  // Save handler
  const handleSave = () => {
    if (!selectedRef.current) {
      errorRef.current.textContent = "Please select a book first";
      errorRef.current.style.display = "book";
      return;
    }

    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      cover: info.imageLink?.thumbnail || "",
      description: info.description || "",
      pages: info.pageCount || null,
      genre: info.categories?.[0] || "",
      status: statusRef.current.value,
      rating: ratingRef.current.value ? Number(ratingRef.current.value) : null,
      notes: notesRef.current.value.trim(),
      googleId: selectedRef.current?.id || "",
    };

    setBooks((prev) => [newBook, ...prev]);
    navigate("/");
  };

  return (
    <div className="page">
      <h1>Add Book</h1>
      <p className="'subtitle">
        Search Google Books to auto-fill details, or enter manually
      </p>

      <div className="form-group">
        <div className="search bar">
          <input ref={searchRef} placeholder="Search by title or author..." />
          <span className="api-tag">
            ⚡Powered by Google Books API (3rd party API){" "}
          </span>
        </div>
      </div>

      {results.length > 0 && (
        <div className="search-results">
          {results.map((book) => (
            <div
              key={book.id}
              className="search result item"
              onClick={() => handleSelect(book)}>
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeinfo.title}
              />

              <div>
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.author?.[0] || "Unknown"}</p>
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
          borderRadius: "4px",
        }}
        alt="cover"
      />

      {/* Adding Book Title */}
      <div className="form-row">
        <div className="form-group">
          <label>Title</label>
          <input ref={titleRef} placeholder="Book title" />
        </div>

        {/* Adding Author Name */}
        <div className="form-group">
          <label>Author</label>
          <input ref={authorRef} placeholder="Author name" />
        </div>
      </div>

      {/* Status dropdwon */}
      <div className="form-row">
        <div className="form-group">
          <label>Status</label>
          <select ref={statusRef} defaultValue="want to watch">
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
          rows="4"
          placeholder="Your thoughts so far..."></textarea>
      </div>
      <p
        ref={errorRef}
        style={{ display: "none", color: "red", marginBottom: "1rem" }}
      />

      <div className="form-actions" ></div>
      <button onClick={() => navigate("/")}>Cancel</button>
      <button className="btn-primary" onClick={handleSave}>
        Save Book
      </button>
    </div>
  );
}

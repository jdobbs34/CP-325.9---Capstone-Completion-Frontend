import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookListPage({ books, setBooks }) {
  const navigate = useNavigate();

  const filterRef = useRef("all");
  const listRef = useRef(null);

  useEffect(() => {
    console.log(Math.random);
    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll(".book-card");
    cards.forEach((card) => {
      const status = card.getAttribute("data-status");
      if (filterRef.current === "all" || status === filterRef.current) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Filter click handler
  const handleFilter = (value) => {
    filterRef.current = value;
    document.querySelectorAll(".filters button").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-value") === value);
    });
    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll(".book-card");
    cards.forEach((card) => {
      const status = card.getAttribute("data-status");
      if (value === "all" || status === value) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await axios.delete(
        `https://booktracker-backend-server.onrender.com/api/books/${id}`,
      );
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">
      <h1>My Library</h1>

      <div className="filters">
        <button
          data-value="all"
          className="active"
          onClick={() => handleFilter("all")}>
          All Books
        </button>
        <button
          data-value="want to read"
          onClick={() => handleFilter("want to read")}>
          l Want to Read
        </button>
        <button data-value="reading" onClick={() => handleFilter("reading")}>
          Reading
        </button>
        <button data-value="finished" onClick={() => handleFilter("finished")}>
          Finished
        </button>
      </div>

      {books.length === 0 && <p>No books yet. Add one!</p>}

      <div className="book-container" ref={listRef}>
        {books.map((book) => (
          <div key={book._id} className="book-card" data-status={book.status}>
            {book.cover && <img src={book.cover} alt={book.title} />}
            <div style={{ flex: 1 }}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p style={{ textTransform: "capitalize" }}>{book.status}</p>
              {book.rating && <p>{"⭐".repeat(book.rating)}</p>}
              {book.notes && (
                <p style={{ fontstyle: "italic" }}>{book.notes}</p>
              )}
              <div style={{ marginTop: " 0.5rem" }}>
                <button
                  className="btn-primary"
                  onClick={() => navigate(`/book/${book._id}`)}>
                  Edit
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(`${book._id}`)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

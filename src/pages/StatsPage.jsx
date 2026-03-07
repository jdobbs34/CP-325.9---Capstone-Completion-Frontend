import { useNavigate } from "react-router-dom";

// Function for math
export default function StatsPage({ books }) {
  const navigate = useNavigate();

  const total = books.length;
  const finished = books.filter((b) => b.status === "finished").length;
  const reading = books.filter((b) => b.status === "reading").length;
  const wantToRead = books.filter((b) => b.status === "want to read").length;
  const rated = books.filter((b) => b.rating);
  const avgRating = rated.length
    ? (rated.reduce((sum, b) => sum + b.rating, 0) / rated.length).toFixed(1)
    : "N/A";

  if (total === 0) {
    return (
      <div className="page">
        <h1>Stats</h1>
        <p style={{ color: "#fff" }}>
          No books yet.{" "}
          <button className="btn-primary" onClick={() => navigate("/add")}>
            Add one
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Stats</h1>

      <div className="stats-flex">
        <div className="stat-card">
          <h2>{total}</h2>
          <p>Total Books</p>
        </div>
        <div className="stat-card">
          <h2>{finished}</h2>
          <p>Finished</p>
        </div>
        <div className="stat-card">
          <h2>{reading}</h2>
          <p>Reading</p>
        </div>
        <div className="stat-card">
          <h2>{wantToRead}</h2>
          <p>Want to Read</p>
        </div>
        <div className="stat-card">
          <h2>{avgRating}</h2>
          <p>Avg Rating</p>
        </div>
      </div>

      {/* Reading Progrees Bar */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}> Reading Progress</h2>

        <div style={{ marginBottom: "0.75rem" }}>
          <p style={{ marginBottom: "0.25rem" }}>Finished ({finished}) </p>

          <div
            style={{
              background: "#c4be9d",
              borderRadius: "4px",
              height: "20px",
            }}>
            <div
              style={{
                background: "#630b0b",
                borderRadius: "4px",
                width: `${total ? (finished / total) * 100 : 0}%`,
                height: "20px",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <p style={{ marginBottom: "0.25rem" }}>Reading ({reading}) </p>

          <div
            style={{
              background: "#c4be9d",
              borderRadius: "4px",
              height: "20px",
            }}>
            <div
              style={{
                background: "#0b6321",
                borderRadius: "4px",
                width: `${total ? (reading / total) * 100 : 0}%`,
                height: "20px",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <p style={{ marginBottom: "0.25rem" }}>Want to Read ({wantToRead}) </p>

          <div
            style={{
              background: "#c4be9d",
              borderRadius: "4px",
              height: "20px",
            }}>
            <div
              style={{
                background: "#1b0b63",
                borderRadius: "4px",
                width: `${total ? (finished / total) * 100 : 0}%`,
                height: "20px",
              }}
            />
          </div>
        </div>

        
      </div>

      <h2 style={{ marginBottom: "1rem" }}>Recently Added</h2>
      {books.slice(0, 4).map((book) => (
        <div
          key={book._id}
          className="stat-book-card"
          style={{ width: "55rem" }}>
          {book.cover && <img src={book.cover} alt={book.title} />}
          <div>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p style={{ textTransform: "capitalize" }}>{book.status}</p>
            {book.rating && <p>{"⭐".repeat(book.rating)}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Function and hooks
export default function BookDetailPage({ books, setBooks }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // useRef for inputs
  const statusRef = useRef(null);
  const ratingRef = useRef(null);
  const notesRef = useRef(null);

  // useRef for elements
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const coverRef = useRef(null);
  const successRef = useRef(null);
  const errorRef = useRef(null);

  // useEffect to load book data when page opens
  useEffect(() => {
    const book = books.find((b) => b._id === id);
    if (!book) return navigate("/");

    if (titleRef.current) titleRef.current.textContent = book.title;
    if (authorRef.current) authorRef.current.textContent = book.author;
    if (statusRef.current) statusRef.current.value = book.status;
    if (ratingRef.current) ratingRef.current.value = book.rating || "";
    if (notesRef.current) notesRef.current.value = book.notes || "";

    if (book.cover) {
      coverRef.current.src = book.cover;
      coverRef.current.style.display = "block";
    }
  }, [id, books]);

  // // Update handler - Use this when deployed
  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   const book = books.find((b) => b._id === id);

  //   const updated = {
  //     ...book,
  //     status: statusRef.current.value,
  //     rating: ratingRef.current.value ? Number(ratingRef.current.value) : null,
  //     notes: notesRef.current.value.trim(),
  //   };

  //   try {
  //     const res = await axios.put(
  //       `https://booktracker-backend-server.onrender.com/api/books/${id}`,
  //       updated,
  //     );
  //     setBooks((prev) => prev.map((b) => (b._id === id ? res.data : b)));
  //     successRef.current.textContent = "Updated!";
  //     successRef.current.style.display = "block";
  //     setTimeout(() => {
  //       if (successRef.current) {
  //         successRef.current.style.display = "none";
  //       }
  //     }, 2000);
  //   } catch (error) {
  //     console.log(error);
  //     errorRef.current.textContent = "Failed to save book. Try again";
  //     errorRef.current.style.display = "block";
  //   }
  // };

  // // Delete handler
  // const handleDelete = async () => {
  //   if (!window.confirm("Delete this Book?")) return;
  //   try {
  //     await axios.delete(`https://booktracker-backend-server.onrender.com/api/books/${id}`);
  //     setBooks((prev) => prev.filter((b) => b._id !== id));
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Update handler - Use this when not deployed
  const handleUpdate = async (e) => {
    e.preventDefault();
    const book = books.find((b) => b._id === id);

    const updated = {
      ...book,
      status: statusRef.current.value,
      rating: ratingRef.current.value ? Number(ratingRef.current.value) : null,
      notes: notesRef.current.value.trim(),
    };

    try {
      const res = await axios.put(
        `http://localhost:3000/api/books/${id}`,
        updated,
      );
      setBooks((prev) => prev.map((b) => (b._id === id ? res.data : b)));
      successRef.current.textContent = "Updated!";
      successRef.current.style.display = "block";
      setTimeout(() => {
        if (successRef.current) {
          successRef.current.style.display = "none";
        }
      }, 2000);
    } catch (error) {
      console.log(error);
      errorRef.current.textContent = "Failed to save book. Try again";
      errorRef.current.style.display = "block";
    }
  };

 // Delete handler
  const handleDelete = async () => {
    if (!window.confirm("Delete this Book?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="page">
      <button onClick={() => navigate("/")}>⬅️Back</button>
      <img
        ref={coverRef}
        style={{
          display: "none",
          width: "200px",
          height: "250px",
          objectFit: "cover",
          borderRadius: "8px",
          margin: "1rem 0",
           display: "block",
        }}
        alt="book"
      />
      <h1 ref={titleRef} />
      <p
        ref={authorRef}
        style={{ color: "rgb(248, 233, 213)", marginBottom: "1rem" }}
      />

      {/* Status dropdwon */}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Status</label>
          <select ref={statusRef}>
            <option value="want to read">Want to Read</option>
            <option value="reading">Reading</option>
            <option value="finished">Finished</option>
          </select>
        </div>

        {/* Rating dropdown */}
        <div className="form-group">
          <label>Rating</label>
          <select ref={ratingRef}>
            <option value="">No rating</option>
            <option value="1">1⭐</option>
            <option value="2">2⭐⭐</option>
            <option value="3">3⭐⭐⭐</option>
            <option value="4">4⭐⭐⭐⭐</option>
            <option value="5">5⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        {/* Comment box */}
        <div className="form-group">
          <label>Notes</label>
          <textarea
            ref={notesRef}
            rows="4"
            placeholder="Your thoughts so far..."
          />
        </div>

        <p
          ref={successRef}
          style={{ display: "none", color: "green", marginBottom: "0.5rem" }}
        />
          <p
          ref={errorRef}
          style={{ display: "none", color: "red", marginBottom: "0.5rem" }}
        />
        <button type="submit" className="btn-primary">
          Update
        </button>
        <button type="button" className="btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </div>
  );
}

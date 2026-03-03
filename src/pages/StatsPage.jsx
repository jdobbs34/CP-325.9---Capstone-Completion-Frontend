import { useNavigate } from "react-router-dom";

// Function for math
export default function StatsPage({characters}) {
  const navigate = useNavigate();

  const total = characters.length;
  const finished = characters.filter(b => b.status === "finished").length;
  const reading = characters.filter(b => b.status === "reading").length;
  const wantToRead = characters.filter(b => b.status === "want to read").length;
  const rated = characters.filter(b => b.rating)
  const avgRating = rated.length
  ?(rated.reduce((sum, b) => sum + b.rating, 0) / rated.length).toFixed(1)
  :'N/A'

  if (total === 0) {
    return (
      <div className="page" >
        <h1>Stats</h1>
        <p style={{color: '#aaa'}} >No books yet. <button className="btn-primary" onClick={() => navigate('/add')} >Add one</button></p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Stats</h1>

      <div className="stats-grid">
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

      <h2 style={{ marginBottom: '1rem' }} >Recently Added</h2>
      {book.slice(0, 4).map(character => (
        <div key={book.id} className="character-card" >
          {character.image && <img src={book.image} alt={book.name} /> }
          <div>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p style={{textTransform: 'capitalize'}}>{book.status}</p>
              {book.rating && <p>{"⭐".repeat(book.rating)}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function BookListPage({books, setBooks}) {
const navigate = useNavigate()

const filterRef = useRef('all')
const listRef = useRef(null)

useEffect(() => {
  if (!listRef.current) return
   const cards = listRef.current.querySelectorAll(".book-card");
})


}

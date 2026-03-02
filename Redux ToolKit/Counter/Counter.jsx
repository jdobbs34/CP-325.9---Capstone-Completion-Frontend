import { useDispatch, useSelector } from "react-redux";
import { incrementByAmount } from "../features/counter/counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const numberToChangeBy = document.getElementById("numberToChangeBy");
    console.log(numberToChangeBy.value); // String
    dispatch(incrementByAmount(parseInt(numberToChangeBy.value)));
  }

  return (
    <>
      <h1>Counter is now {count}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="" id="numberToChangeBy" />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

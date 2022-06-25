/** @format */

import { useDispatch } from "react-redux";
import { gameplayData, setGameOver } from "../../store/gameplaySlice";
import { createScore, resetYourRank } from "../../store/scoresSlice";

export const GameOver = () => {
 const dispatch = useDispatch();
 const { name, email, score } = useSelector(gameplayData);

 const handleSubmit = (bool) => {
  if (bool) {
   dispatch(createScore({ name, email, score }));
  }
  dispatch(setGameOver(false));
 };

 useEffect(() => {
  dispatch(resetYourRank());
 }, []);

 return (
  <>
   <h1>GAME OVER</h1>
   <h5>Thanks for playing!</h5>
   <h3>Score: {score}</h3>
   <div className="game-over-btns">
    <button onClick={() => handleSubmit(true)}>Submit score</button>
    <button onClick={() => handleSubmit(false)}>Skip</button>
   </div>
  </>
 );
};

const Form = ({ setInputsState }) => {
 return (
  <form>
   <input
    type="text"
    name="name"
    id="name"
    placeholder="Fill in your name..."
    required
    onChange={(e) =>
     setInputsState((prev) => {
      return {
       ...prev,
       exists: {
        ...prev.exists,
        name: e.target.value ? true : false,
       },
       content: {
        ...prev.content,
        name: e.target.value,
       },
      };
     })
    }
   />
   <input
    type="email"
    name="email"
    id="email"
    placeholder="Fill in your e-mail..."
    required
    onChange={(e) =>
     setInputsState((prev) => {
      return {
       ...prev,
       exists: {
        ...prev.exists,
        email: e.target.validity.valid ? true : false,
       },
       content: {
        ...prev.content,
        email: e.target.value,
       },
      };
     })
    }
   />
   <label htmlFor="">I agree:</label>
   <input
    type="checkbox"
    name=""
    id="privacy"
    onChange={(e) =>
     setInputsState((prev) => {
      return {
       ...prev,
       exists: {
        ...prev.exists,
        checkbox: e.target.checked ? true : false,
       },
      };
     })
    }
   />
  </form>
 );
};

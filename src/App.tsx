import { Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import RecipePage from "./Components/RecipePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipe" element={<RecipePage />} />
      </Routes>

    </div>
  );
}

export default App;

import { FirstPage } from "./pages/firstPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {SingleCoin} from "./pages/singleCoin";

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<FirstPage />} />
          <Route path="/coins/:coinId" element={<SingleCoin/>} />
          
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

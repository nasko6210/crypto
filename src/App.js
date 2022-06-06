import { FirstPage } from "./pages/firstPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {SingleCoin} from "./pages/singleCoin";
import {Registration} from "../src/pages/registration"
function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<FirstPage />} />
          <Route path="/coins/:coinId" element={<SingleCoin/>} />
          <Route path="/registration" element={<Registration/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

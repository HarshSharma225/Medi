import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/medicine/:id" element={<Detail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

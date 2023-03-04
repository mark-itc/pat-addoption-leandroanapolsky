import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";

import Pet from "./views/Pet";
import Home from "./views/Home";
import Search from "./views/Search";
import User from "./views/User";

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Pet" element={<Pet />} />
          <Route path="/User" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

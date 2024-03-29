import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Pet from "./views/Pet";

import Home from "./views/Home";
import Search from "./views/Search";
import User from "./views/User";
import UserAdmin from "./views/UserAdmin";

import AddPet from "./views/AddPet";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/pet/:id" element={<Pet />} />
          <Route path="/pet/:id" element={<Pet />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/admin/user/:id" element={<UserAdmin />} />
          <Route path="/admin/addpet" element={<AddPet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import axios from "axios";
// j'importe mes pages ici
import Home from "./pages/Home";
import Comic from "./pages/Comics";
import Favorites from "./pages/Favorites";
import HeroDetails from "./pages/HeroDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
//

//FONTAWSOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faHeart);
//

function App() {
  // const [querySearch, setQuerySearch] = useState("");

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={""} />
        <Route path="/hero" element={<Home />} />
        <Route path="/comics" element={<Comic />} />
        <Route path="/hero-details" element={<HeroDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;

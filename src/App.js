import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// j'importe mes pages ici
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
//

//FONTAWSOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);
//

function App() {
  const [querySearch, setQuerySearch] = useState("");
  return (
    <Router>
      <Header querySearch={querySearch} setQuerySearch={setQuerySearch} />
      <Routes>
        <Route path="/" element={<Home querySearch={querySearch} />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;

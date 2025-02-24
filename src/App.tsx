import NotFound from "./components/NotFound.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";
import AddBooks from "./components/AddBooks.js";
import Register from "./components/registrasi";
import UpdateBook from "./components/UpdateBook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/registrasi" element={<Register />} />
        <Route path="/add" element={<AddBooks />} />
        <Route path="/update" element={<UpdateBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

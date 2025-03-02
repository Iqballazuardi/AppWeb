import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./components/NotFound.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login";
import AddBooks from "./components/AddBooks.js";
import Register from "./components/registrasi";
import UpdateBook from "./components/UpdateBook";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/registrasi" element={<Register />} />
          <Route path="/books/addBooks" element={<AddBooks />} />
          <Route path="/books/booksUpdate/:id" element={<UpdateBook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

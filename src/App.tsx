import Home from "./pages/home.js";
import Login from "./pages/Login.js";
import AddBooks from "./pages/AddBooks.js";
import Register from "./pages/registrasi.js";
import UpdateBook from "./pages/UpdateBook.js";
import NotFound from "./components/NotFound.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
          <Route path="/books/update/:id" element={<UpdateBook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

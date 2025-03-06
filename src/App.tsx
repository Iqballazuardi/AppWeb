import Home from "./pages/home";
import Login from "./pages/Login";
import AddBooks from "./pages/AddBooks";
import Register from "./pages/registrasi";
import UpdateBook from "./pages/UpdateBook";
import NotFound from "./components/NotFound";
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

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/1" element={<Details />} />
          <Route path="/profile/1" element={<Profile />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

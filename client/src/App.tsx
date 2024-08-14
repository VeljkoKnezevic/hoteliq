import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  // Generates price and hotel rating based on id
  function getNumbers(id: number, min: number, max: number) {
    const range = max - min;

    return Number(min + (range * Math.log(id + 1)) / Math.log(40))
      .toFixed(1)
      .replace(/(\.0+|0+)$/, "");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home getNumbers={getNumbers} />} />
          <Route
            path="/details/:id"
            element={<Details getNumbers={getNumbers} />}
          />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

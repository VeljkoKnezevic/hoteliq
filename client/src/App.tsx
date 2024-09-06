import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "notistack";
import Staff from "./pages/Staff";
import PrivateRoute from "./misc/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<PageNotFound />} />
              <Route
                path="/profile/:id"
                element={
                  <PrivateRoute
                    element={<Profile />}
                    roles={["STAFF", "GUEST"]}
                  />
                }
              />

              <Route
                path="/staff"
                element={
                  <PrivateRoute
                    element={<Staff />}
                    roles={["STAFF", "GUEST"]}
                  />
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;

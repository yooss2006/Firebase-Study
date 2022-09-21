import { Navigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Nav from "./pages/components/nav/Nav";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  const { isAuthReady, user } = useAuthContext();

  return (
    <div className="App">
      {isAuthReady ? (
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                user ? <Home /> : <Navigate replace={true} to="/login" />
              }
            />
            <Route
              path="/login"
              element={user ? <Navigate replace={true} to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate replace={true} to="/" /> : <Signup />}
            />
          </Routes>
        </BrowserRouter>
      ) : (
        "loading"
      )}
    </div>
  );
}

export default App;

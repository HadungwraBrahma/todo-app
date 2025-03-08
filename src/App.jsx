import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header.jsx";
import TaskList from "./components/Tasks/TaskList.jsx";
import Login from "./components/Auth/Login.jsx";
import PrivateRoute from "./components/Auth/PrivateRoute.jsx";
import { checkAuthStatus } from "./redux/thunks/authThunks.js";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <TaskList />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

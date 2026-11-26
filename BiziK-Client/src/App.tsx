import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

const About = lazy(() => import("./components/About"));
const Signin = lazy(() => import("./components/Signin"));
const Signup = lazy(() => import("./components/Signup"));
const Allcards = lazy(() => import("./components/Allcards"));
const Newcard = lazy(() => import("./components/Newcard"));
const Mycards = lazy(() => import("./components/Mycards"));
const Editcard = lazy(() => import("./components/Editcard"));
const Profile = lazy(() => import("./components/Profile"));

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-right" />
      <Router>
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="all-cards" element={<Allcards />} />
          <Route
            path="new-card"
            element={
              <ProtectedRoute bizOnly>
                <Newcard />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="my-cards">
            <Route
              index
              element={
                <ProtectedRoute bizOnly>
                  <Mycards />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit/:id"
              element={
                <ProtectedRoute bizOnly>
                  <Editcard />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;

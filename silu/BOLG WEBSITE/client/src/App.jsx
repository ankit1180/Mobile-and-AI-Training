import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./Components/Login";
import UserDashboard from "./Pages/UserDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import CreateBlog from "./Pages/CreateBlog";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);

  const handleLogin = (user, userRole) => {
    setCurrentUser(user);
    setRole(userRole.toLowerCase()); // normalize role
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setRole(null);
  };

  // Helper function to get the user route
  const getUserRoute = () => {
    return currentUser ? `/user/${currentUser.id}/${currentUser.name}` : "/login";
  };

  // Helper function to get admin route
  const getAdminRoute = () => {
    return currentUser ? `/admin/${currentUser.id}` : "/login";
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route "/" */}
        <Route
          path="/"
          element={
            currentUser ? (
              role === "admin" ? (
                <Navigate to={getAdminRoute()} />
              ) : (
                <Navigate to={getUserRoute()} />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Login route */}
        <Route
          path="/login"
          element={
            currentUser ? (
              role === "admin" ? (
                <Navigate to={getAdminRoute()} />
              ) : (
                <Navigate to={getUserRoute()} />
              )
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user/:id/:name"
          element={
            role === "user" ? (
              <UserDashboard
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* User Create Blog */}
        <Route
          path="/user/:id/create"
          element={<CreateBlog />}
        />

        {/* Admin Dashboard with dynamic ID */}
        <Route
          path="/admin/:id"
          element={
            role === "admin" ? (
              <AdminDashboard
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin Create Blog */}
        <Route
          path="/admin/:id/create"
          element={<CreateBlog />}
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

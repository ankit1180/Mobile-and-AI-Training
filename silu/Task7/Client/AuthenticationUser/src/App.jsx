import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/home",
      element: <Home />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">Blogify</h1>

      <div className="flex gap-6 text-sm font-medium">
        <Link to="/dashboard" className="hover:text-indigo-600">
          Dashboard
        </Link>
        <Link to="/" className="hover:text-indigo-600">
          Blogs
        </Link>
        <Link to="/create" className="hover:text-indigo-600">
          Create
        </Link>
        <Link to="/admin" className="text-amber-600 font-semibold">
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

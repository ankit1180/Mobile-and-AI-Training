import BlogCard from "../Components/BlogCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { viewOwnBlogsApi, viewAllUsersBlogsApi } from "../utils/Apis";
import { useNavigate } from "react-router-dom";


const UserDashboard = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState({
    ownBlogs: [],
    otherBlogs: [],
  });

  const [search, setSearch] = useState("");

  // 🔹 Fetch all users blogs
  const allUsersBlogs = async () => {
    try {
      const res = await viewAllUsersBlogsApi();
      setBlogs((prev) => ({
        ...prev,
        otherBlogs: res.data,
      }));
    } catch (err) {
      alert(err.response?.data?.error || "Blog fetch failed");
    }
  };

  // 🔹 Fetch own blogs
  const getBlogsById = async () => {
    if (!id) return;
    try {
      const res = await viewOwnBlogsApi(id);
      console.log("Response is : ", res);
      setBlogs((prev) => ({
        ...prev,
        ownBlogs: res.data,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBlogsById();
    allUsersBlogs();
  }, [id]);


  const handleBlogUpdate = (updatedBlog) => {
    setBlogs((prev) => ({
      ownBlogs: updatedBlog.deleted
        ? prev.ownBlogs.filter((b) => b._id !== updatedBlog._id)
        : prev.ownBlogs.map((b) =>
          b._id === updatedBlog._id ? { ...b, ...updatedBlog } : b
        ),

      otherBlogs: prev.otherBlogs.map((user) => ({
        ...user,
        blogs: updatedBlog.deleted
          ? user.blogs.filter((b) => b._id !== updatedBlog._id)
          : user.blogs.map((b) =>
            b._id === updatedBlog._id ? { ...b, ...updatedBlog } : b
          ),
      })),
    }));
  };




  // 🔍 Filter other blogs based on search
  const filteredOtherBlogs = blogs.otherBlogs.flatMap((user) =>
    user._id !== id
      ? user.blogs
        .filter((blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((blog) => ({
          ...blog,
          name: user.name,
        }))
      : []
  );

  return (
    <div className="bg-slate-100 min-h-screen">

      {/* 🔝 Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md p-6">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>
            <h2 className="text-2xl font-bold">Welcome, {name} 👋</h2>
            <p className="text-gray-500 text-sm">
              Manage your blogs and activity
            </p>
          </div>

          <div className="flex gap-4 items-center">

            {/* 🔍 Search */}
            <input
              type="text"
              placeholder="Search blogs by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-60"
            />

            {/* ➕ Create */}
            <button
              onClick={() => navigate(`/user/${id}/create`)}
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
            >
              Create New Blog
            </button>


          </div>
        </div>
      </div>

      <div className="p-10">

        {/* 📊 Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">Total Blogs</p>
            <h3 className="text-3xl font-bold mt-2">
              {blogs.ownBlogs.length}
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">Total Views</p>
            <h3 className="text-3xl font-bold mt-2">10.8 Billion</h3>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">Last Updated</p>
            <h3 className="text-xl font-semibold mt-2">
              {new Date().toLocaleDateString()}
            </h3>
          </div>
        </div>

        {/* 📝 Own Blogs */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4">Your Blogs</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.ownBlogs.length > 0 ? (
              blogs.ownBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={{ ...blog, name }}
                  userID={id}
                  onUpdate={handleBlogUpdate}
                />
              ))
            ) : (
              <p className="text-gray-500">You have no blogs yet.</p>
            )}
          </div>
        </div>

        {/* 🌍 Other Blogs */}
        <div>
          <h3 className="text-xl font-bold mb-4">Others Blogs</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOtherBlogs.length > 0 ? (
              filteredOtherBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  onUpdate={handleBlogUpdate}
                />
              ))
            ) : (
              <p className="text-gray-500">No blogs match your search.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;

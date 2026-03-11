import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogCard from "../Components/BlogCard";
import { viewAllUsersBlogsApi } from "../utils/Apis";

const AdminDashboard = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all users with their blogs
  const allUsersBlogs = async () => {
    try {
      const res = await viewAllUsersBlogsApi();
      setUsers(res.data); // users with blogs
    } catch (err) {
      alert(err.response?.data?.error || "Blog fetch failed");
    }
  };

  useEffect(() => {
    allUsersBlogs();
  }, []);

  // Callback to update a blog in state after editing/deleting
  const handleBlogUpdate = (updatedBlog) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        const blogIndex = user.blogs.findIndex((b) => b._id === updatedBlog._id);

        if (blogIndex !== -1) {
          if (updatedBlog.deleted) {
            const updatedBlogs = user.blogs.filter((b) => b._id !== updatedBlog._id);
            return { ...user, blogs: updatedBlogs };
          } else {
            const updatedBlogs = [...user.blogs];
            updatedBlogs[blogIndex] = { ...updatedBlogs[blogIndex], ...updatedBlog };
            return { ...user, blogs: updatedBlogs };
          }
        }

        return user;
      })
    );
  };

  // Filter users by search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-100 min-h-screen">

      {/* 🔝 Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <p className="text-gray-600 text-sm">
              Manage all users and their blogs
            </p>
          </div>

          <div className="flex gap-4 items-center">
            {/* 🔍 Search */}
            <input
              type="text"
              placeholder="Search by user name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-60"
            />

            {/* ➕ Create New Blog */}
            <button
              onClick={() => navigate(`/admin/${id}/create`)}
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
            >
              Create New Blog
            </button>

          </div>
        </div>
      </div>

      <div className="p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.flatMap((user) =>
              user.blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={{
                    name: user.name,
                    title: blog.title,
                    content: blog.content,
                    author: blog.author,
                    _id: blog._id,
                  }}
                  isAdmin
                  onUpdate={handleBlogUpdate} // Live update after edit
                />
              ))
            )
          ) : (
            <p className="text-gray-500">No users or blogs match your search</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

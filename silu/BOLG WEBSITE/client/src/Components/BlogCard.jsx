import { useState } from "react";
import axios from "axios";
import { deleteBlogApi, editBlogApi } from "../utils/Apis";
const BlogCard = ({ blog = { title: "", content: "", author: "", name: "" }, isAdmin = false, userID, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBlog, setEditedBlog] = useState({
    title: blog.title,
    content: blog.content
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog((prev) => ({ ...prev, [name]: value }));
  };

  // Check permission before editing
  const handleEditClick = () => {
    setLoading(true);
    try {
      if (isAdmin) {
        setIsEditing(true);
      } else if (userID && blog.author === userID) {
        setIsEditing(true);
      } else {
        alert("You do not have permission to edit this blog.");
      }
    } catch (err) {
      alert("Error checking permission");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Save changes
  const handleSave = async () => {
    setSaving(true);
    const payload = {
      userId: blog.author,
      blogId: blog._id,
      title: editedBlog.title,
      content: editedBlog.content
    }

    try {
      const res = await editBlogApi(payload);
      alert("Blog updated successfully!");
      setIsEditing(false);

      const updatedData = {
        _id: blog._id,
        title: editedBlog.title,
        content: editedBlog.content,
        author: blog.author,
        name: blog.name
      }

      if (onUpdate) onUpdate(updatedData);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to update blog.");
    } finally {
      setSaving(false);
    }
  };

  const deleteBlogHandler = async () => {

    if (!isAdmin && (blog.author != userID)) {
      return alert("Do not have permission to delete!!");
    }

    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const payload = {
        userId: blog.author,
        blogId: blog._id
      }
      const res = await deleteBlogApi(payload); // await the API call
      alert("Blog Deleted Successfully");

      // Update parent state to remove this blog from the UI
      if (onUpdate) {
        onUpdate({ ...blog, deleted: true }); // mark as deleted
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to delete the blog.");
    }
  }

  if (!blog) return null; // prevents crash if blog is undefined

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col gap-4">
      {/* Title */}
      <div className="flex justify-between items-start">
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editedBlog.title}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full text-lg font-semibold"
          />
        ) : (
          <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
        )}

        {isAdmin && (
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
            Admin Access
          </span>
        )}
      </div>

      {/* Content */}
      {isEditing ? (
        <textarea
          name="content"
          value={editedBlog.content}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 text-gray-700 text-sm leading-relaxed w-full"
        />
      ) : (
        <p className="text-gray-600 text-sm leading-relaxed">{blog.content}</p>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-2">
        <span className="text-xs text-gray-500">
          By <strong>{blog.name}</strong>
        </span>

        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                className={`text-green-500 text-sm hover:underline ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                className="text-gray-500 text-sm hover:underline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {(isAdmin || blog.author === userID) && (
                <>
                  <button
                    className={`text-indigo-600 text-sm hover:underline ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleEditClick}
                    disabled={loading}
                  >
                    {loading ? "Checking..." : "Edit"}
                  </button>
                  <button
                    className="text-red-500 text-sm hover:underline"
                    onClick={() => deleteBlogHandler()}
                  >
                    Delete
                  </button>
                </>
              )}
            </>

          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

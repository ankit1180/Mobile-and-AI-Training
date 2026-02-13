import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {createBlogApi} from "../utils/Apis"

const CreateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = async () => {



    const payload = {
      title: title,
      content: content,
      author: id,
      action: "CREATE_BLOG"
    }

    try {
      const res = await createBlogApi(payload);
      // 🔥 Call your create blog API here
      // await createBlogApi({ title, content, author: id });
      alert("Blog Created Successfully");
      navigate(`/user/${id}`); // go back to dashboard
    } catch (err) {
      alert("Failed to create blog");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex justify-center py-12">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Write a new blog</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog title"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your content here..."
          className="w-full h-64 p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={() => navigate(`/user/${id}`)}
            className="px-6 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handlePublish}
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;

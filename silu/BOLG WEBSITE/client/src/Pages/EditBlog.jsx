const EditBlog = () => {
  return (
    <div className="bg-slate-100 min-h-screen flex justify-center py-12">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>

        <input
          defaultValue="How React Changed Frontend Development"
          className="w-full mb-4 p-3 border rounded focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          defaultValue="React introduced a component-based architecture..."
          className="w-full h-64 p-3 border rounded resize-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex justify-end mt-6 gap-4">
          <button className="px-6 py-2 border rounded hover:bg-gray-100">
            Cancel
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;

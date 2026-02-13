import BlogCard from "../Components/BlogCard";

const Blogs = () => {
  return (
    <div className="bg-slate-100 min-h-screen p-10">
      <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
};

export default Blogs;

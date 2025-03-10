import { type PagebuilderType } from "@/types";
import { RichText } from "../richtext";
import { BlogCard } from "../blog-card";

type LatestBlogsProps = PagebuilderType<"latestBlogs">;

export function LatestBlogs({
  richText,
  showFeatured,
  blogs,
  featuredBlogs,
}: LatestBlogsProps) {
  const blogsList = showFeatured ? featuredBlogs : blogs;

  if (!blogsList) return null;

  return (
    <section id="LatestBlogs" className="bg-background-secondary section">
      <div className="container">
        <RichText className="text-center mb-16" richText={richText} />
        <div className="grid md:grid-cols-2 gap-4">
          {blogsList.map((blog, index) => (
            // @ts-ignore
            <BlogCard key={`${blog?._id}-${index}`} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

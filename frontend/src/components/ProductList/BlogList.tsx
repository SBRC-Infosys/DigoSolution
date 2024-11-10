import { Blog } from '@/types/blog';
import SingleBlog from '../Blog/SingleBlog';


type BlogListFilter = {
  blogs: Blog[];
};

export default function BlogList({ blogs }: BlogListFilter) {
  return (
    <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>
          </div>
  );
}




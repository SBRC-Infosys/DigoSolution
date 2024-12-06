import blogData from '@/components/Blog/blogData';


export type BlogFilters = {
  search?: string;
};

export const fetchBlogs = async (options?: BlogFilters) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let filteredBlogs = blogData;

  if (options?.search) {
    filteredBlogs = filteredBlogs.filter((product) => {
      return product.title.toLowerCase().includes(options.search!.toLowerCase());
    });
  }

  return filteredBlogs;
};

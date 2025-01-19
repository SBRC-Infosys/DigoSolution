// import blogData from '@/components/Blog/blogData';

import axiosInstance from "./baseurl";

export type BlogFilters = {
  id?: any;
  search?: string;
  page?: number;
  limit?: number;
};

export type BlogCategoryFilters = {
  search?: string;
  id?: any;
};

export const fetchBlogs = async (options?: BlogFilters) => {
  const { page = 1, limit = 10, search = "", id } = options || {};

  // Construct the query parameters
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search: search,
  });

  if (id) {
    queryParams.append("id", id.toString());
  }

  // Make the API request with query parameters
  const response = await axiosInstance.get(`/blog?${queryParams.toString()}`);

  return response.data;
};

export const fetchBlogCategories = async (options?: BlogCategoryFilters) => {
  const query = options?.search ? `/${options.search}` : "";
  const response = await axiosInstance.get(`/blogcategory${query}`);

  return response.data?.data;
};

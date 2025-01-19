import axiosInstance from "./baseurl";

export type UserFilters = {
  search?: string;
};

export const fetchUsers = async (options?: UserFilters) => {
  const query = options?.search ? `/${options.search}` : "";
  const response = await axiosInstance.get(`/user${query}`);

  return response.data?.data;
};

import axiosInstance from "./baseurl";

export const fetchSocialLinks = async () => {
  try {
    const response = await axiosInstance.get("/social-links");
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching social links:", error);
    throw error;
  }
};

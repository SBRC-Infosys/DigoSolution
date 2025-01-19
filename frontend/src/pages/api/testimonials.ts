import axiosInstance from "./baseurl";

export const fetchTestimonials = async () => {
  try {
    const response = await axiosInstance.get("/testimonials");
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

import axiosInstance from "./baseurl";
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  subject: string;
  message: string;
}

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const response = await axiosInstance.post("/contact", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to submit contact form",
    );
  }
};

import axiosInstance from "./baseurl";

export const fetchOurClients = async () => {
  try {
    const response = await axiosInstance.get("/clients");
    return response.data?.clients;
  } catch (error) {
    console.error("Error fetching our clients:", error);
    throw error;
  }
};

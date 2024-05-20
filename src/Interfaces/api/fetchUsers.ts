import { axiosInstance } from "./axiosInstance";

export const fetchUsers = async (email: string, password: string) => {
  try {
    const userResponse = await axiosInstance.get(`/users?email=${email}&password=${password}`);
    const adminResponse = await axiosInstance.get(`/admins?email=${email}&password=${password}`);
    return !!userResponse.data.length || !!adminResponse.data.length;
  } catch (error) {
    console.log("Error Fetching Users", error);
    throw error;
  }
};

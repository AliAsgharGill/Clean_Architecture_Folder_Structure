import useUserService from "../../Interfaces/services/UserService";

const useGetUserData = () => {
  const { getUserData } = useUserService();
  const userData = getUserData();

  if (userData) {
    const fullName = `${userData.firstName} ${userData.secondName}`;
    return {
      ...userData,
      fullName,
    };
  }

  return null;
};

export default useGetUserData;

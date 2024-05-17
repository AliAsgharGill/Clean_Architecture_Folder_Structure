interface UserData {
    id: number;
    firstName: string;
    secondName: string;
    email: string;
    image: string;
  }
  
  const useUserService = () => {
    const getUserData = (): UserData | null => {
      const adminString = localStorage.getItem("admin");
      const userString = localStorage.getItem("user");
  
      if (adminString) {
        return JSON.parse(adminString);
      } else if (userString) {
        return JSON.parse(userString);
      } else {
        return null;
      }
    };
  
    return {
      getUserData,
    };
  };
  
  export default useUserService;
  
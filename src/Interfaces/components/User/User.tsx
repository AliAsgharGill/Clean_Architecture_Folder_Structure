import React from "react";
import useGetUserData from "../../../core/useCases/candidates/getUserData";
import UserCard from "../common/UserCard";


const User: React.FC = () => {
  const userData = useGetUserData();

  return (
    <>
      {userData ? (
        <UserCard
          id={userData.id}
          fullName={userData.fullName}
          email={userData.email}
          image={userData.image}
        />
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p>No user data found</p>
        </div>
      )}
    </>
  );
};

export default User;

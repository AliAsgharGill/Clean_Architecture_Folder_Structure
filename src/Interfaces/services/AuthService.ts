import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../core/useCases/Redux/Slices/userSlice";
import { removeAdmin } from "../../core/useCases/Redux/Slices/adminSlice";

const useAuthService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to logout?",
      okButtonProps: { style: { backgroundColor: "#2D9596" } },
      onOk() {
        localStorage.removeItem("user");
        dispatch(removeUser());
        navigate("/login/user");
      },
      onCancel() {},
    });
  };

  const handleLogoutAdmin = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to logout?",
      okButtonProps: { style: { backgroundColor: "#2D9596" } },
      onOk() {
        localStorage.removeItem("admin");
        dispatch(removeAdmin());
        navigate("/login/user");
      },
      onCancel() {},
    });
  };

  return {
    handleLogout,
    handleLogoutAdmin,
  };
};

export default useAuthService;

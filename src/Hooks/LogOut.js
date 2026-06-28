import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import Swal from "sweetalert2";

function LogOut() {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate("/", { replace: true });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Logged Out",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return { handleSignOut };
}

export default LogOut;

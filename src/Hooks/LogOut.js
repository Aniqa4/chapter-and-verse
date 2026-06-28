import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import { toast } from "sonner";

function LogOut() {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate("/", { replace: true });
        toast.success("Successfully logged out");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return { handleSignOut };
}

export default LogOut;

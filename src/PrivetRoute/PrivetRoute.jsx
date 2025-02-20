import { useContext } from "react";
import { AuthContext } from "../provaider/AuthProvaider";
import { useNavigate } from "react-router";

const PrivetRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return navigate("/");
  }

  return children;
};

export default PrivetRoute;

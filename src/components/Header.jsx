import { useContext } from "react";
import { AuthContext } from "../provaider/AuthProvaider";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
const Header = () => {
  const { handelGoogleLogin, handelLogout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = () => {
    handelGoogleLogin().then(async (res) => {
      const newUser = {
        name: res.user.displayName,
        email: res.user.email,
      };
      // success message
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login Successfull!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/task");
      // send data in db
      await axios.post(
        "https://task-server-rouge-five.vercel.app/users",
        newUser
      );
    });
  };

  return (
    <header className="bg-slate-50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex justify-between items-center py-5">
          {/* left item */}
          <div>
            <Link to={"/"} className="text-lg italic md:text-2xl font-bold">
              taskManagement
            </Link>
          </div>

          {/* right item */}
          <div>
            {user ? (
              <div className="flex items-center gap-5">
                <Link className="font-medium" to={"/task"}>
                  Add Task
                </Link>
                <button
                  onClick={handelLogout}
                  className="bg-gray-800 text-white px-5 py-2 rounded cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-gray-800 text-white px-5 py-2 rounded cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

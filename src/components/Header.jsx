import { useContext } from "react";
import { AuthContext } from "../provaider/AuthProvaider";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
const Header = () => {
  const { handelGoogleLogin, handelLogout, user } = useContext(AuthContext);

  const handleLogin = () => {
    handelGoogleLogin().then(async (res) => {
      const newUser = {
        name: res.user.displayName,
        email: res.user.email,
      };
      toast.success("Login Successfull!");
      // send data in db
      await axios.post("http://localhost:5000/users", newUser);
    });
  };

  return (
    <section>
      <div className="max-w-xl mx-auto px-2 min-h-screen flex justify-center items-center">
        <div className="w-full flex flex-col gap-5">
          <div className="flex justify-between items-center bg-sky-400 p-5 md:p-10 rounded  text-white w-full min-h-32">
            {/* left item */}
            <div>
              <p className="text-lg font-semibold">
                {user ? <>{user.displayName}</> : <>User</>}
              </p>
            </div>

            {/* right item */}
            <div>
              {user ? (
                <button
                  onClick={handelLogout}
                  className="bg-purple-500 text-white px-5 py-2 rounded cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-purple-500 text-white px-5 py-2 rounded cursor-pointer"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* task link */}
          <div className="max-w-4xl max-h-auto px-2 text-center text-white">
            {user && <Link to={'/task'} className="bg-sky-400 p-3 rounded">Go to task</Link>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;

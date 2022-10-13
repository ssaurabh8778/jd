import React from "react";
import { useHistory } from "react-router-dom";
import { destroyCookie } from "nookies";
import { setUser } from "../redux/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //Method for logout
  const logout = () => {
    destroyCookie(null, "accessToken");
    dispatch(setUser({}));
  };
  return (
    <div className="absolute top-0 flex justify-between items-center bg-[#f8f8f8] w-screen h-12">
      <p
        className="text-center text-2xl font-bold text-gray-900 mx-4 cursor-pointer"
        onClick={() => history.push("/")}
      >
        JD Demo App
      </p>
      <div className="flex items-center">
        {!isEmpty(user) && (
          <>
            <p
              className="text-center text-xl font-bold text-gray-600 mx-4 cursor-pointer"
              onClick={() => history.push("/dashboard")}
            >
              Dashboard
            </p>
            <p
              className="text-center text-xl font-bold text-gray-600 mx-4 cursor-pointer"
              onClick={() => history.push("/profile")}
            >
              Profile
            </p>
            <button
              className="py-2 px-4 mx-4 h-full text-xl bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserTools } from "../hooks/useUserTools";
import { setCookie } from "nookies";
import { setUser } from "../redux/action";
import { useDispatch } from "react-redux";
import Header from "../componets/Header";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { loginHttp } = useUserTools();

  //Method for login
  const loginUser = async () => {
    const sData = { username, password };
    try {
      const rData = await loginHttp(sData);
      const config = {
        path: '/',
        maxAge: 604800,
        sameSite: true,
      }
      setCookie(null, "accessToken", rData.token, config);
      dispatch(setUser(rData));
      history.push("/dashboard");
    } catch (err) {
      alert("Error", err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Header/>
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">
          Login Page
        </h1>

        <div className="w-3/4 mb-6">
          <input
            type="username"
            name="username"
            id="username"
            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="w-3/4 mb-6">
          <input
            type="password"
            name="password"
            id="password"
            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 "
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-3/4 mt-4">
          <button
            type="submit"
            className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
            onClick={loginUser}
          >
            Login
          </button>
          <p
            className="mt-4 cursor-pointer"
            onClick={() => history.push("/register")}
          >
            Don't have an account? <strong className="text-[#0000FF]">Register</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../componets/Header";
import { useUserTools } from "../hooks/useUserTools";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const history = useHistory();
  const { registerHttp } = useUserTools();

  //Method to register user
  const registerUser = async (e) => {
    const sData = { username, password, firstName, lastName };
    try {
      const rData = await registerHttp(sData);
      console.log(rData);
      if (rData.message === "Registration successful") {
        alert("Registered successfully. Please login");
        history.push("/login");
      }
    } catch (err) {
      console.log("Error1", err);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Header />
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">
          Register Page
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
            type="text"
            name="firstName"
            id="firstName"
            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="w-3/4 mb-6">
          <input
            type="lastName"
            name="lastName"
            id="lastName"
            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            onClick={(e) => registerUser(e.target.value)}
          >
            Register
          </button>
          <p
            className="mt-4 text-blue cursor-pointer"
            onClick={() => history.push("/login")}
          >
            Already have an account?{" "}
            <strong className="text-[#0000FF]">Login</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

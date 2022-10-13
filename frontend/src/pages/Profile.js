import React, { useState } from "react";
import Header from "../componets/Header";
import { useSelector, useDispatch } from "react-redux";
import { useUserTools } from "../hooks/useUserTools";
import { setUser } from "../redux/action";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const { updateUserHttp } = useUserTools();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  //Method for updating user details
  const updateProfile = async () => {
    try {
      const sData = { username, firstName, lastName };
      const rData = await updateUserHttp(sData, user.id);
      dispatch(setUser(rData));
      alert("Details updated successfully");
    } catch (err) {
      alert("Error", err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Header />
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">
          Profile Page
        </h1>

        <div className="w-3/4 mb-6">
          <input
            type="username"
            name="username"
            id="username"
            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            placeholder="Username"
            value={username}
            disabled
          />
        </div>

        <div className="w-3/4 mb-6">
          <input
            type="firstName"
            name="firstName"
            id="firstName"
            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 "
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
            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 "
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="w-3/4 mt-4">
          <button
            type="submit"
            className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
            onClick={updateProfile}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

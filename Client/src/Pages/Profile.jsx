import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    password: ""
  });
  

  const [userData, setUserData] = useState(null); 

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return toast.error("Token not found!");
        }
        const url = "https://task-manager-app-sigma-ruby.vercel.app/api/getProfile";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });
        const result = await response.json();
        
  
        if (result && result.message && result.message.data) {
          setUserData(result.message.data);
          setEditData(result.message.data);
        } else {
          toast.error("User data not found!");
        }
      } catch (error) {
        toast.error("Failed to fetch profile details.");
      }
    };
    getProfile();
  }, []);

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return toast.error('Token not found!');
      }
      const url = 'https://task-manager-app-pi-ruby.vercel.app/api/updateProfile';
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData)
      });
      const result = await response.json();
      
      if (result.status === 'success') {
        toast.success('Profile updated successfully!');
        

        setUserData(editData); 
        setEditMode(false);
      } else {
        toast.error('Failed to update');
      }
    } catch (error) {
      toast.error('Failed to update');
    }
  };

 
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500 text-sm">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-2xl w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Profile Information
          </h2>
          <p className="text-sm text-gray-500">
            Your personal details retrieved from the server.
          </p>
        </div>

        <form className="grid md:grid-cols-2 gap-4" onSubmit={updateHandler}>
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email Address
            </label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={editData?.email || ""}
                onChange={changeHandler}
                placeholder="Enter your email"
                className="p-2.5 bg-gray-50 border border-gray-400 rounded-lg text-gray-700 text-sm focus:outline-none"
              />
            ) : (
              <input
                type="email"
                readOnly
                value={userData?.email || ""}
                placeholder="Enter your email"
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none cursor-not-allowed"
              />
            )}
          </div>

          {/* First Name Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              First Name
            </label>
            {editMode ? (
              <input
                type="text"
                name="firstName"
                onChange={changeHandler}
                value={editData?.firstName || ""}
                placeholder="First name"
                className="p-2.5 bg-gray-50 border border-gray-400 rounded-lg text-gray-700 text-sm focus:outline-none"
              />
            ) : (
              <input
                type="text"
                readOnly
                value={userData?.firstName || ""}
                placeholder="First name"
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none cursor-not-allowed"
              />
            )}
          </div>

          {/* Last Name Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Last Name
            </label>
            {editMode ? (
              <input
                type="text"
                name="lastName"
                value={editData?.lastName || ""}
                onChange={changeHandler}
                placeholder="Last name"
                className="p-2.5 bg-gray-50 border border-gray-400 rounded-lg text-gray-700 text-sm focus:outline-none"
              />
            ) : (
              <input
                type="text"
                readOnly
                value={userData?.lastName || ""}
                placeholder="Last name"
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none cursor-not-allowed"
              />
            )}
          </div>

          {/* Mobile Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Mobile Number
            </label>
            {editMode ? (
              <input
                type="text"
                name="mobile"
                onChange={changeHandler}
                value={editData?.mobile || ""}
                placeholder="Mobile number"
                className="p-2.5 bg-gray-50 border border-gray-400 rounded-lg text-gray-700 text-sm focus:outline-none"
              />
            ) : (
              <input
                type="text"
                readOnly
                value={userData?.mobile || ""}
                placeholder="Mobile number"
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none cursor-not-allowed"
              />
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Password
            </label>
            {editMode ? (
              <input
                type="password"
                name="password"
                onChange={changeHandler}
                value={editData?.password || ""}
                placeholder="Enter new password"
                className="p-2.5 bg-gray-50 border border-gray-400 rounded-lg text-gray-700 text-sm focus:outline-none"
              />
            ) : (
              <input
                type="text"
                readOnly
                value="*******"
                placeholder="Password"
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none cursor-not-allowed"
              />
            )}
          </div>
        
          <div className="mt-6 flex justify-end md:col-span-2">
            {editMode ? (
              <div className="flex gap-2">
                <button 
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors shadow-sm"
                  onClick={() => {
                    setEditData(userData); 
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Update
                </button>
              </div>
            ) : (
              <button 
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}
          </div> 
        </form>
      </div>
    </div>
  );
};

export default Profile;
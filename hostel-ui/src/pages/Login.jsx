import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({

    email: "",
    password: ""

  });

  const handleChange = (e) => {

    setLoginData({

      ...loginData,

      [e.target.name]: e.target.value

    });
  };

  const handleLogin = async () => {

    try {

      const response = await axios.post(

        "http://localhost:8083/api/students/login",

        loginData
      );

      if (response.data) {

        alert("Login Successful");

        // SAVE STUDENT

        localStorage.setItem(
          "student",
          JSON.stringify(response.data)
        );

        // NAVIGATE

        navigate("/student-dashboard");

      } else {

        alert("Invalid Email or Password");
      }

    } catch (error) {

      alert("Login Failed");

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[480px]">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">

          Student Login

        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={loginData.email}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-5 text-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={loginData.password}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-5 text-lg"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-4 rounded-xl text-xl font-bold"
        >

          Login

        </button>

      </div>

    </div>
  );
}

export default Login;
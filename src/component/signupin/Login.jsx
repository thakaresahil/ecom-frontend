import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/loginstatus";

function Login({ open, handleClose, handleRegister }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localcheck = localStorage.getItem("Ec0Mt0kEn");
  useEffect(() => {
    if (localcheck) {
      handleClose();
    }
  }, [localcheck, handleClose]);

  const [logindata, setData] = useState({
    email: "",
    password: "",
  });
  const [wrongpassword, setWrongPassword] = useState("");
  const [redirecttosignup, setRedirecttosignup] = useState("");
  const [formError, setFormError] = useState("");
  function handlechange(event) {
    setData({
      ...logindata,
      [event.target.name]: event.target.value,
    });
  }

  function loggerin() {
    setFormError("");
  
    // Ensure all fields in logindata are filled
    for (const key in logindata) {
      if (logindata[key] === "") {
        setFormError("Please fill out all fields.");
        return;
      }
    }
  
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, logindata, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const result = response.data;
  
        // Handle server-side errors
        if (result.error) {
          setFormError(result.error);
          return; // Prevent further execution if there's an error
        }
  
        // Save token and UID to localStorage if present
        if (result.uid && result.token) {
          localStorage.setItem("Ec0MuID", result.uid);
          localStorage.setItem("Ec0Mt0kEn", result.token);
          dispatch(login());
          handleClose();
        } else {
          setFormError("Login failed. Please try again.");
        }
      })
      .catch((error) => {
        // Handle request errors
        console.error("Error making the request:", error);
        setFormError("An error occurred. Please try again.");
      });
  }

  function handlesubmit(event) {
    event.preventDefault();
    setRedirecttosignup("");
    setWrongPassword("");
    // console.log(logindata);
    if (localStorage.getItem("Ec0Mt0kEn") !== null){
      handleClose();
    } else {
      loggerin();
    }
  }

  return (
    <Dialog open={open}>
      <div className="flex justify-center items-center">
        <form
          className="bg-white px-6 py-8 rounded shadow-md text-black w-96"
          onSubmit={handlesubmit}
        >
          <h1 className="mb-8 text-3xl text-center">Log In</h1>
          <button className="absolute top-2 right-2 " onClick={handleClose}>
            ❌
          </button>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4 hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            name="email"
            placeholder="Email"
            onChange={handlechange}
            value={logindata.email}
            required
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4 hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            name="password"
            placeholder="Password"
            onChange={handlechange}
            value={logindata.password}
            required
          />
          {wrongpassword && (
            <p className="text-red-700 text-sm w-full mx-auto">
              {wrongpassword}
            </p>
          )}
          {redirecttosignup && (
            <p className="text-red-700 text-sm w-full mx-auto">
              {redirecttosignup}
            </p>
          )}
          {formError && (
            <p className="text-red-700 text-sm w-full mx-auto">{formError}</p>
          )}
          <button
            onClick={handlesubmit}
            type="submit"
            className="w-full text-center py-3 rounded  bg-red-500 text-white hover:bg-red-600 focus:outline-none my-1 hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 hover:scale-105 duration-300"
          >
            Log In
          </button>
          {/* </div> */}
          <div className="text-grey-dark mt-6">
            <p>
              Create account{" "}
              <button className="text-blue-600" onClick={handleRegister}>
                here.
              </button>
            </p>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default Login;

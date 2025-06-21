import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = login, 2 = otp
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = { username, password };
      const res = await axios.post("http://localhost:8080/login", user, { withCredentials: true });
      if (res.status === 200 && res.data.includes("OTP sent")) {
        setStep(2);
        alert("OTP sent to your registered mobile number.");
      }
    } catch (err) {
      alert("Incorrect username or password!");
      console.error(err);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/verify-otp", { otp }, { withCredentials: true });
      if (res.status === 200 && res.data === "Login successful") {
        sessionStorage.setItem("username", username);
        navigate("/home");
      } else {
        alert("Invalid OTP!");
      }
    } catch (err) {
      alert("OTP verification failed!");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        {step === 1 ? (
          <>
            <label htmlFor='username'>Username</label>
            <input type='email' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <a href="/">Register</a>
            <button onClick={login} type="submit">Login</button>
          </>
        ) : (
          <>
            <label htmlFor='otp'>Enter OTP</label>
            <input type='text' name='otp' id='otp' value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={verifyOtp} type="submit">Verify OTP</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;

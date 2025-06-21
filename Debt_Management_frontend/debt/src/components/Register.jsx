import { useState, React } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/Register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    const finalNumber="+91"+mobileNumber;
    const user = {
      username: username,
      password: password,
      mobileNumber: finalNumber
    };

    await axios
      .post("http://localhost:8080/register", user, { withCredentials: true })
      .then((response) => {
        const result = response.data;
        if (result === "Username already taken") {
          alert("Already registered!");
          navigate("/login");
        } else if (result === "User registered successfully") {
          alert("Registered successfully");
          navigate("/login");
        }
      })
      .catch((err) => {
        alert("Error in registration");
        console.error(err);
      });
  }

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="email"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="mobile">Mobile Number</label>
        <input
          type="tel"
          name="mobile"
          id="mobile"
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <a href="/login">Login</a>
        <button onClick={register} type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

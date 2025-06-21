import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../styles/RetrieveDebt.css';
import { Navigate } from "react-router-dom";
const RetrieveDebt = () => {
  const [debts, setDebts] = useState([]);
  const navigate=useNavigate();
 useEffect(() => {
  const fetchDebts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllDebts", {
        withCredentials: true, // Important for sending session cookies
      });

      if (response.status === 200) {
        setDebts(response.data);
        console.log("Debts fetched:", response.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        console.error("Failed to fetch debts:", err);
      }
    }
  };
  fetchDebts();
}, []);


  async function del(id) {
    await axios
      .delete(`http://localhost:8080/delete/${id}`, { withCredentials: true })
      .then((response) => {
        if (response.date === "Debt not found") {
          alert("error");
        } else if (response.data === "Deleted successfully") {
          window.location.reload();
        }
      })
      .catch((err) => {
        alert("error");
        console.log(err);
      });
  }
  return (
    <div className="retrieve-container">
      <h1>Retrieve</h1>
      {debts.length === 0 ? (
        <p>No debts found</p>
      ) : (
        <ul>
          {debts.map((debt, key) => (
            <div key={key} className="debt-card">
              <li>Receiver : {debt.debtReceiver}</li>
              <li>Principal Amount : {debt.amount}</li>
              <li>Date : {debt.date}</li>
              <Link to={`/view/${debt.id}`}>
                <button>View</button>
              </Link>
              <Link to={`/update/${debt.id}`}>
                <button>Update</button>
              </Link>
              <button onClick={() => del(debt.id)}>Delete</button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RetrieveDebt;

import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/AddDebt.css';
const AddUser = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  async function addDebt(e) {
    const user = {
      debtReceiver: name,
      amount: amount,
      date: date,
    };
    e.preventDefault();
    await axios
      .post("http://localhost:8080/addDebt", user, { withCredentials: true })
      .then((response) => {
        if (response.data === "Added successfully") {
          navigate("/home");
        }
      })
      .catch((err) => {
        alert("Error in adding new debt");
      });
  }
  function handleDate(e) {
    const rawDate = e.target.value;
    const [year, month, day] = rawDate.split("-");
    const newDate = `${day}/${month}/${year}`;
    setDate(newDate);
  }
  return (
    <div className="add-debt-container">
      <h1>Add Debt</h1>
      <form>
        <label htmlFor="debtReceiver">Name</label>
        <input
          type="text"
          name="debtReceiver"
          id="debtReceiver"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <label htmlFor="date">Date</label>
        <input type="date" name="date" id="date" onChange={handleDate} />

        <button onClick={addDebt}>Add</button>
      </form>
    </div>
  );
};

export default AddUser;

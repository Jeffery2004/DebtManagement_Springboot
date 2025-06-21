import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/UpdateDebt.css';

const UpdateDebt = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(""); // yyyy-MM-dd for input
  const [formattedDate, setFormattedDate] = useState(""); // dd/MM/yyyy for backend

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getDebt/${id}`, { withCredentials: true })
      .then((res) => {
        const data = res.data;
        setName(data.debtReceiver);
        setAmount(data.amount);

        const [day, month, year] = data.date.split("/");
        const formattedInputDate = `${year}-${month}-${day}`;
        setDate(formattedInputDate);
        setFormattedDate(data.date); // keep as dd/MM/yyyy
      })
      .catch((err) => {
        console.error("Failed to fetch debt:", err);
      });
  }, [id]);

  function handleDate(e) {
    const rawDate = e.target.value; // yyyy-MM-dd
    const [year, month, day] = rawDate.split("-");
    setDate(rawDate);
    setFormattedDate(`${day}/${month}/${year}`);
  }

  async function updateDebt(e) {
    e.preventDefault();
    const updatedDebt = {
      debtReceiver: name,
      amount: amount,
      date: formattedDate,
    };

    await axios
      .put(`http://localhost:8080/update/${id}`, updatedDebt, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data === "Updated successfully") {
          alert("Updated successfully");
          navigate("/retrieve");
        } else {
          alert("Update failed");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error updating debt");
      });
  }

  return (
    <div className="update-debt-container">
      <h1>Update Debt</h1>
      <form>
        <label htmlFor="debtReceiver">Receiver</label>
        <input
          type="text"
          name="debtReceiver"
          id="debtReceiver"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="amount">Principal Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={handleDate}
        />

        <button onClick={updateDebt}>Update</button>
      </form>
    </div>
  );
};

export default UpdateDebt;

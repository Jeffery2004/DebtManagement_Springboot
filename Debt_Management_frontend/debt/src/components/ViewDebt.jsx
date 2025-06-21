import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ViewDebt.css";
const ViewDebt = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [interests, setInterests] = useState([]);
  const [interest, setInterest] = useState(0);
  const[intdate,setIntdate]=useState("");
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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getInterest/${id}`, { withCredentials: true })
      .then((res) => {
        setInterests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const totalInterest = interests.reduce((acc, item) => acc + item.interest, 0);

  async function addInterest(e) {
    e.preventDefault();
    const user = {
      debtId: id,
      interest: interest,
      date:intdate
    };
    if (interest == 0) {
      alert("Enter interest");
    }else if( intdate==""){
      alert("Enter date");
    } else {
      await axios
        .post("http://localhost:8080/addInterest", user, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data === "Added successfully") {
            window.location.reload();
          }
        })
        .catch((err) => {
          alert("error");
          console.log(err);
        });
    }
  }
  function handleDate(e) {
    const rawDate = e.target.value; // yyyy-MM-dd
    const [year, month, day] = rawDate.split("-");
    setDate(rawDate);
    setFormattedDate(`${day}/${month}/${year}`);
  }
  function handleIntDate(e) {
    const rawDate = e.target.value; // yyyy-MM-dd
    const [year, month, day] = rawDate.split("-");
    setIntdate(`${day}/${month}/${year}`);
  }
  let sum = 0;
  return (
    <div className="update-debt-container">
      <h1>View Debt</h1>
      <h4>Receiver :</h4>
      <p>{name}</p>
      <br></br>
      <h4>Amount :</h4>
      <p>{amount}</p>
      <br></br>
      <h4>Date :</h4>
      <p>{formattedDate}</p>
      <br></br>
      <h4 className="interest">Interest:</h4><h4>Date:</h4><br></br>
      {interests.length === 0 ? (
        <p>No interests found</p>
      ) : (
        <ul className="interest-list">
          {interests.map((interest, key) => (
            <div key={key}>
              <span className="interest">
                {key + 1}. {"₹"}
                {interest.interest}
              </span>
              <span>{interest.date}</span>
            </div>
          ))}
        </ul>
      )}
      <br></br><h4>Total Interest:</h4>{" "}
      <p>{"₹"}{totalInterest}</p>
      <input
        type="number"
        onChange={(e) => {
          setInterest(e.target.value);
        }}
        placeholder="Enter Interest"
      ></input>
      <input type="date" placeholder="Enter Date" onChange={handleIntDate}></input>
      <button onClick={addInterest}>Add interest</button>
    </div>
  );
};

export default ViewDebt;

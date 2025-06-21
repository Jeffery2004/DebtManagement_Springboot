import '../styles/Home.css';
const Home = () => {
  return (
    <div className="home-container">
      <h1>Debt Management</h1>
      <h3>Welcome {sessionStorage.getItem("username")}</h3>
      <button className="add-button">
        <a href="/addDebt">Add Debt</a>
      </button>
      <button className='retrieve-button'>
        <a href="/retrieve">Retrieve</a>
      </button>
      <button className='retrieve-button'>
        <a href="/report">Report</a>
      </button>
    </div>
  );
};

export default Home;

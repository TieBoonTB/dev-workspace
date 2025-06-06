import React from "react";
import BigButton from "../components/BigButton";
import "./Dashboard.css";

const Dashboard = () => {
  const handleClick = (label) => {
    alert(`You clicked ${label}`);
  };

  return (
    <div className="dashboard-container">
      <BigButton label="Option 1" onClick={() => handleClick("Option 1")} />
      <BigButton label="Option 2" onClick={() => handleClick("Option 2")} />
      <BigButton label="Option 3" onClick={() => handleClick("Option 3")} />
    </div>
  );
};

export default Dashboard;
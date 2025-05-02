import React from "react";
import { Link } from "react-router";;

const Dashboard = () => {
  return (
    <div>
      <Link
        className="flex-centric text-primary block text-center text-2xl"
        to="/"
      >
        Home
      </Link>
      This is a Dashboard Page.
      
    </div>
  );
};

export default Dashboard;

import { Link, Outlet } from "react-router";
import Aside from "../components/Dashboard/Aside";

const Dashboard = () => {
  return (
    <div>
      {/* <Link
        className="flex-centric text-primary block text-center text-2xl"
        to="/"
      >
        Home
      </Link> */}
      <div className="bg-background-light dark:bg-background-dark dark:text-text-primary-dark selection:bg-primary overflow-hidden transition-all duration-200 selection:text-white">
        {/* Main Content Container */}
        <div className="flex">
          {/* Side Navigation */}
          <Aside />
          {/* Dynamic Content Container */}
          <Outlet  />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

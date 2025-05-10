import { Link, Outlet } from "react-router";
import Aside from "../components/Dashboard/Aside";

const Dashboard = () => {
  return (
    <div>
      <div className="bg-background-light dark:bg-background-dark dark:text-text-primary-dark selection:bg-primary overflow-hidden transition-all duration-200 selection:text-white">
        {/* Main Content Container */}
        <div className="mx-auto flex max-w-screen-2xl border">
          {/* Side Navigation */}
          <div className="">
            <Aside />
          </div>
          {/* Dynamic Content Container */}
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

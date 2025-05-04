import {
  FiAlignLeft,
  FiEdit,
  FiFilePlus,
  FiFileText,
  FiHome,
  FiKey,
  FiLogOut,
  FiMoon,
  FiPhoneCall,
  FiPrinter,
  FiSidebar,
  FiSun,
  FiUser,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import Title from "../Shared/Utilities/Title";
import { GiGlobeRing } from "react-icons/gi";
import { TbArrowBarLeft } from "react-icons/tb";
import AsideLinks from "./AsideLinks";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "../../providers/ThemeProvider";
import ThemeToggle from "../Shared/Utilities/ThemeToggle";
import { FaRegHandPointRight } from "react-icons/fa";

const Aside = () => {
  const [expanded, setExpanded] = useState(true);
  const [isDark] = useContext(ThemeContext);

  // *Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setExpanded(false);
      }
    };
    checkScreenSize();
  }, []);

  return (
    <aside className="h-screen bg-gradient-to-br from-rose-200 to-pink-400 dark:text-black">
      <nav className="flex h-full flex-col p-3 shadow-sm">
        {/* title & collapse button */}
        <div className="flex-centric">
          <div
            className={`overflow-hidden transition-all duration-200 ${
              expanded ? "ml-3" : "w-0"
            }`}
          >
            <Title />
          </div>
          {/* window collapse button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`border-primary bg-accent hover:bg-primary rounded-full border-2 p-2 text-2xl text-white transition-all duration-200 ${
              expanded && "ml-5"
            }`}
          >
            {expanded ? <TbArrowBarLeft /> : <FiSidebar />}
          </button>
        </div>
        <hr className="bg-primary my-2 h-0.5 border-t-0" />

        <div className="flex h-screen flex-col">
          {/* Navigation links */}
          <div className="grow">
            {/* common route */}
            <NavLink to="/dashboard/statistics">
              {({ isActive }) => (
                <AsideLinks
                  icon={<FiAlignLeft />}
                  text={"Dashboard"}
                  expanded={expanded}
                  active={isActive}
                />
              )}
            </NavLink>

            {/* Normal user navigation */}
            <NavLink to="/dashboard/edit-biodata">
              {({ isActive }) => (
                <AsideLinks
                  icon={<FiEdit />}
                  text={"Edit Biodata"}
                  expanded={expanded}
                  active={isActive}
                  alert={alert}
                />
              )}
            </NavLink>

            <NavLink to="/dashboard/view-biodata">
              {({ isActive }) => (
                <AsideLinks
                  icon={<FiPrinter />}
                  text={"View Biodata"}
                  expanded={expanded}
                  active={isActive}
                />
              )}
            </NavLink>

            <NavLink to="/dashboard/contact-request">
              {({ isActive }) => (
                <AsideLinks
                  icon={<FiPhoneCall />}
                  text={"My Contact Request"}
                  expanded={expanded}
                  active={isActive}
                />
              )}
            </NavLink>

            <NavLink to="/dashboard/favourite-biodata">
              {({ isActive }) => (
                <AsideLinks
                  icon={<FiFileText />}
                  text={"My Favourite Biodata"}
                  expanded={expanded}
                  active={isActive}
                />
              )}
            </NavLink>

            <NavLink to="/dashboard/got-married">
              {({ isActive }) => (
                <AsideLinks
                  icon={<GiGlobeRing />}
                  text={"Got Married"}
                  expanded={expanded}
                  active={isActive}
                />
              )}
            </NavLink>

            {/* admin navigation */}
            <NavLink to="/dashboard/manage-users">
              {({ isActive }) => (
                <AsideLinks
                  icon={<FiUsers />}
                  text={"Manage Users"}
                  expanded={expanded}
                  active={isActive}
                />
              )}
            </NavLink>

            <NavLink to="/dashboard/approved-premium">
              {({ isActive }) => (
                <AsideLinks
                  icon={<FiUserCheck />}
                  text={"Approved Premium"}
                  expanded={expanded}
                  active={isActive}
                />
              )}
            </NavLink>

            <NavLink to="/dashboard/approved-contact-request">
              {({ isActive }) => (
                <AsideLinks
                  icon={<FiKey />}
                  text={"Approved Contact Request"}
                  expanded={expanded}
                  active={isActive}
                />
              )}
            </NavLink>

            <NavLink to="/dashboard/success-story">
              {({ isActive }) => (
                <AsideLinks
                  icon={<FiFilePlus />}
                  text={"Success Story"}
                  expanded={expanded}
                  active={isActive}
                />
              )}
            </NavLink>
            <hr className="bg-primary my-2 h-0.5 border-t-0" />
            {/* home navigation */}
            <NavLink to="/">
              {({ isActive }) => (
                <AsideLinks
                  icon={<FiHome />}
                  text={"Return To Home"}
                  expanded={expanded}
                  active={isActive}
                />
              )}
            </NavLink>
          </div>
          {/* Dark mode toggling */}
          <div className="flex-centric justify-start">
            {/* toggling button */}
            <div className="ml-2">
              <ThemeToggle />
            </div>
            {/* mood details */}
            <div
              className={`flex-centric gap-2 overflow-hidden py-2 transition-all duration-200 ${expanded ? "ml-5" : "w-0"}`}
            >
              <h3>{isDark ? "Light Mood" : "Night Mood"}</h3>
              <div className="flex-centric text-2xl">
                {isDark ? <FiSun /> : <FiMoon />}
              </div>
            </div>
          </div>
          <hr className="bg-primary my-2 h-0.5 border-t-0" />
          {/* Profile & logout */}
          <div className="flex-centric justify-start">
            <div className="rounded-full bg-gray-300 p-3">
              <FiUser className="text-accent text-2xl" />
            </div>

            <div
              className={`flex-centric overflow-hidden transition-all duration-200 ${
                expanded ? "ml-3" : "w-0"
              }`}
            >
              {/* profile details */}
              <div>
                <h3>John Doe</h3>
                <span>john@email.com</span>
              </div>
              {/* logout button */}
              <a data-tooltip-id="logout" data-tooltip-content="Logout">
                <button
                  className={`border-primary bg-accent hover:bg-primary rounded-full border-2 p-2 text-2xl text-white transition-all duration-200 ${
                    expanded && "ml-5"
                  }`}
                >
                  <FiLogOut />
                </button>
              </a>
              <Tooltip id="logout" />
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
export default Aside;

import {
  FiEdit,
  FiFileText,
  FiLogOut,
  FiPhoneCall,
  FiPrinter,
  FiSidebar,
  FiUser,
} from "react-icons/fi";
import Title from "../Shared/Utilities/Title";
import { GiGlobeRing } from "react-icons/gi";
import { TbArrowBarLeft } from "react-icons/tb";
import AsideLinks from "./AsideLinks";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Tooltip } from "react-tooltip";

const Aside = () => {
  const [expanded, setExpanded] = useState(true);

  // *Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setExpanded(false);
      }
    };
    checkScreenSize();
  }, []);

  console.log(expanded);
  return (
    <aside className="h-screen bg-gradient-to-tl from-rose-200 to-pink-300">
      <nav className="flex h-full flex-col p-3 shadow-sm">
        <div className="flex-centric">
          <div
            className={`overflow-hidden transition-all duration-200 ${
              expanded ? "ml-3" : "w-0"
            }`}
          >
            <Title />
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`border-primary bg-accent hover:bg-primary rounded-full border-2 p-2 text-2xl text-white transition-all duration-200 ${
              expanded && "ml-5"
            }`}
          >
            {expanded ? <TbArrowBarLeft /> : <FiSidebar />}
          </button>
        </div>
        <div className="flex h-screen flex-col">
          {/* Navigation links */}
          <div className="grow">
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
          </div>
          <div className="flex-centric justify-start">
            <div className="rounded-full bg-gray-300 p-3">
              <FiUser className="text-accent text-2xl" />
            </div>

            <div
              className={`flex-centric overflow-hidden transition-all duration-200 ${
                expanded ? "ml-3" : "w-0"
              }`}
            >
              <div>
                <h3>John Doe</h3>
                <span>john@email.com</span>
              </div>
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

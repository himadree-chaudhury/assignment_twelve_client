// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardSkeleton from "../Common/DashboardSkeleton";
import { FiTrash2, FiUserCheck } from "react-icons/fi";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  // *Fetch Users
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-users");
      return data;
    },
  });

  return (
    <div className="aside-layout">
      <title>Manage Users | Pathway</title>
      <PageHeading
        heading={"Manage Users"}
        text={"Oversee and support all platform members"}
      />
      <div className="">
        {isLoading ? (
          <DashboardSkeleton />
        ) : users.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table-container min-w-full">
              <thead className="table-head">
                <tr>
                  {[
                    "User Name",
                    "User Email",
                    "User Status",
                    "Make Admin",
                    "Make Premium",
                  ].map((heading, index) => (
                    <th key={index}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {users.map((user) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td>
                        <div>{user.displayName}</div>
                      </td>
                      <td>
                        <div>{user.email}</div>
                      </td>
                      <td>
                        <div>{user.role}</div>
                      </td>
                      {/* Action Buttons */}
                      <td>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-success hover:text-success-hover"
                        >
                          <FiUserCheck className="h-5 w-5" />
                        </motion.button>
                      </td>
                      <td>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-success hover:text-success-hover"
                        >
                          <FiUserCheck className="h-5 w-5" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card py-12 text-center"
          >
            <h3 className="mb-4">You haven't added any biodata yet</h3>
            <Link to="/allcars">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex-centric mx-auto w-fit gap-2"
              >
                <FiPlus />
                Add Your First Favourite Biodata.
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;

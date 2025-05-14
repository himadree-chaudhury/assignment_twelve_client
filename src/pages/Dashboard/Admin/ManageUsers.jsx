// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardSkeleton from "../Common/DashboardSkeleton";
import { FiTrash2, FiUserCheck } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  // *Fetch Users
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-users");
      return data;
    },
  });

  // *Handle make admin
  const handleAdmin = async (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/make-admin/${email}`);
        } catch (e) {
          toast.error(e);
        } finally {
          refetch();
          toast.success(`User Role Changed To Admin!`);
        }
      }
    });
  };

  // *Handle make premium
  const handlePremium = async (email) => {
    console.log(email);
  };

  return (
    <div>
      <title>Manage Users | Pathway</title>
      <PageHeading
        heading={"Manage Users"}
        text={"Oversee and support all platform members"}
      />
      <div>
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
                        {user?.isAdmin || (
                          <motion.button
                            onClick={() => handleAdmin(user?.email)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-success hover:text-success-hover"
                          >
                            <FiUserCheck className="h-5 w-5" />
                          </motion.button>
                        )}
                      </td>
                      <td>
                        <motion.button
                          onClick={() => handlePremium(user?.email)}
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
            <h3 className="mb-4">There is no user now !</h3>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;

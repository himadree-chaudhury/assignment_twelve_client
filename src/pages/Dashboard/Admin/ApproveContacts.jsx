// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardSkeleton from "../Common/DashboardSkeleton";
import { Link } from "react-router";
import { FiUserCheck, FiUserX } from "react-icons/fi";

const ApproveContacts = () => {
  const axiosSecure = useAxiosSecure();

  // *Fetch Favourite List
  const { data: contactRequests, isLoading } = useQuery({
    queryKey: ["contact-request-list"],
    queryFn: async () => {
      const { data } = await axiosSecure("/contact-request-list");
      return data;
    },
  });

  return (
    <div className="">
      <title>Approved Contact Requests | Pathway</title>
      <PageHeading
        heading={"Approved Contact Requests"}
        text={"Confirm and connect with approved contacts"}
      />
      <div className="">
        {isLoading ? (
          <DashboardSkeleton />
        ) : contactRequests.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table-container min-w-full">
              <thead className="table-head">
                <tr>
                  {["Name", "Email", "Biodata ID", "Actions"].map(
                    (heading, index) => (
                      <th key={index}>{heading}</th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {contactRequests.map((request) => (
                    <motion.tr
                      key={request.biodataId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td>
                        <div>{request.name}</div>
                      </td>
                      <td>
                        <div>{request.email}</div>
                      </td>
                      <td>
                        <div>{request.biodataId}</div>
                      </td>
                      {/* Action Buttons */}
                      <td>
                        <div className="flex gap-3">
                          {request.status !== "cancelled" && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-success hover:text-success-hover"
                              >
                                <FiUserCheck className="h-5 w-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-error hover:text-error-hover"
                              >
                                <FiUserX className="h-5 w-5" />
                              </motion.button>
                            </>
                          )}
                        </div>
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

export default ApproveContacts;

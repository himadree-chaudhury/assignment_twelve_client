// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardSkeleton from "../Common/DashboardSkeleton";
import { Link } from "react-router";
import { FiUserCheck, FiUserX } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ApproveContacts = () => {
  const axiosSecure = useAxiosSecure();

  // *Fetch Favourite List
  const {
    data: contactRequests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contact-request-list"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-contact-request");
      return data;
    },
  });

  // *Handle confirm premium
  const handleConfirmContact = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/approve-contact/${id}`);
        } catch (e) {
          toast.error(e);
        } finally {
          refetch();
          toast.success(`Request Approved Successfully!`);
        }
      }
    });
  };

  // *Handle delete premium
  const handleDeleteContact = async (id) => {
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
          await axiosSecure.delete(`/delete-contact/${id}`);
        } catch (e) {
          toast.error(e);
        } finally {
          refetch();
          toast.success(`Request Deleted Successfully!`);
        }
      }
    });
  };

  return (
    <div>
      <title>Approved Contact Requests | Pathway</title>
      <PageHeading
        heading={"Approved Contact Requests"}
        text={"Confirm and connect with approved contacts"}
      />
      <div>
        {isLoading ? (
          <DashboardSkeleton />
        ) : contactRequests.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table-container min-w-full">
              <thead className="table-head">
                <tr>
                  {["Name", "Email", "Biodata ID", "Status", "Actions"].map(
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
                      key={request._id}
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
                      <td>
                        <div
                          className={`${request.status === "approved" ? "border-pink-600 bg-pink-200" : "border-amber-600 bg-amber-200"} rounded-2xl border px-2 py-1 text-center`}
                        >
                          {request.status === "approved"
                            ? "Approved"
                            : "Pending"}
                        </div>
                      </td>
                      {/* Action Buttons */}
                      <td>
                        <div className="flex gap-3">
                          {request.status === "pending" && (
                            <>
                              <motion.button
                                onClick={() => {
                                  handleConfirmContact(request?._id);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-success hover:text-success-hover"
                              >
                                <FiUserCheck className="h-5 w-5" />
                              </motion.button>
                              <motion.button
                                onClick={() => {
                                  handleDeleteContact(request?._id);
                                }}
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
            <h3 className="mb-4">There is no contact request yet</h3>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ApproveContacts;

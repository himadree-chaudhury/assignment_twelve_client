// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import DashboardSkeleton from "../Common/DashboardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyRequests = () => {
  const axiosSecure = useAxiosSecure();

  // *Fetch Contact Request List
  const {
    data: requestedBiodata,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["request"],
    queryFn: async () => {
      const { data } = await axiosSecure("/contact-requests");
      return data;
    },
  });

  // *Handle Delete Action
  const handleDelete = async (id) => {
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
          toast.success(`Contact Request Deleted Successfully!`);
        }
      }
    });
  };

  return (
    <div>
      <title>My Contact Requests | Pathway</title>
      <PageHeading
        heading={"My Contact Requests"}
        text={"Track and respond to connection requests"}
      />
      <div>
        {isLoading ? (
          <DashboardSkeleton />
        ) : requestedBiodata?.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table-container min-w-full">
              <thead className="table-head">
                <tr>
                  {[
                    "Name",
                    "Biodata ID",
                    "Status",
                    "Mobile No.",
                    "Email",
                    "Delete",
                  ].map((heading, index) => (
                    <th key={index}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {requestedBiodata.map((biodata) => (
                    <motion.tr
                      key={biodata._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td>
                        <div>{biodata.biodataName}</div>
                      </td>
                      <td>
                        <div>{biodata.biodataId}</div>
                      </td>
                      <td>
                        <div
                          className={`${biodata.status === "approve" ? "border-pink-600 bg-pink-200" : "border-amber-600 bg-amber-200"} rounded-2xl border px-2 py-1 text-center`}
                        >
                          {biodata.status === "approve"
                            ? "Approved"
                            : "Pending"}
                        </div>
                      </td>
                      <td>
                        <div>{biodata.mobileNo}</div>
                      </td>
                      <td>
                        <div>{biodata.biodataEmail}</div>
                      </td>
                      {/* Action Buttons */}
                      <td>
                        {biodata?.status === "pending" && (
                          <motion.button
                            onClick={() => handleDelete(biodata?._id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-error hover:text-error-hover"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </motion.button>
                        )}
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
            <h3 className="mb-4">
              You haven't requested any biodata contact yet
            </h3>
            <Link to="/all-biodata">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex-centric mx-auto w-fit gap-2"
              >
                <FiPlus />
                Request Your First Biodata Contact.
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;

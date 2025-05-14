// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEye, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import DashboardSkeleton from "../Common/DashboardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyFavourites = () => {
  // *Context States
  const axiosSecure = useAxiosSecure();

  // *Fetch Favourite List
  const {
    data: favouriteBiodata,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["favourite"],
    queryFn: async () => {
      const { data } = await axiosSecure("/favourites");
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
          await axiosSecure.patch(`/delete-favourite/${id}`);
        } catch (e) {
          toast.error(e);
        } finally {
          refetch();
          toast.success(`Removed From Favourite List!`);
        }
      }
    });
  };

  return (
    <div>
      <title>My Favourite Biodata | Pathway</title>
      <PageHeading
        heading={"My Favourite Biodata"}
        text={"Save and revisit your preferred profiles"}
      />
      <div>
        {isLoading ? (
          <DashboardSkeleton />
        ) : favouriteBiodata.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table-container min-w-full">
              <thead className="table-head">
                <tr>
                  {[
                    "Name",
                    "Biodata ID",
                    "Permanent Address",
                    "Occupation",
                    "View Biodata",
                    "Delete",
                  ].map((heading, index) => (
                    <th key={index}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {favouriteBiodata.map((biodata) => (
                    <motion.tr
                      key={biodata._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td>
                        <div>{biodata.name}</div>
                      </td>
                      <td>
                        <div>{biodata.biodataId}</div>
                      </td>
                      <td>
                        <div>{biodata.permanentDivision}</div>
                      </td>
                      <td>
                        <div>{biodata.occupation}</div>
                      </td>
                      {/* Action Buttons */}
                      <td>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-success hover:text-success-hover"
                        >
                          <Link to={`/biodata-details/${biodata?.biodataId}`}>
                            <FiEye className="h-5 w-5" />
                          </Link>
                        </motion.button>
                      </td>
                      <td>
                        <motion.button
                          onClick={() => handleDelete(biodata?.biodataId)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-error hover:text-error-hover"
                        >
                          <FiTrash2 className="h-5 w-5" />
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

export default MyFavourites;

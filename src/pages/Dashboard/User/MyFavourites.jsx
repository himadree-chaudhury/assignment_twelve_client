// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import DashboardSkeleton from "../Common/DashboardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const MyFavourites = () => {
  // *Context States
  // const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // *Delete State
  // const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // *Fetch Favourite List
  const { data: favouriteBiodata, isLoading } = useQuery({
    queryKey: ["favourite"],
    queryFn: async () => {
      const { data } = await axiosSecure("/favourites");
      return data;
    },
  });

  // *Handle Delete Action
  // const handleDelete = async (id) => {
  //   try {
  //     await axiosSecure.delete(`/cars/${id}`);
  //     setCars(cars.filter((car) => car._id !== id));
  //     toast.success(`${deleteConfirmation.name} Deleted Successfully`);
  //   } catch (e) {
  //     toast.error(e);
  //   } finally {
  //     setDeleteConfirmation(null);
  //   }
  // };

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
                      <td>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-warning hover:text-warning-hover"
                        >
                          <Link to={`/updatecar`}>
                            <FiEdit className="h-5 w-5" />
                          </Link>
                        </motion.div>
                      </td>
                      {/* Action Buttons */}
                      <td>
                        <motion.button
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

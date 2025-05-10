import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import DashboardSkeleton from "../Common/DashboardSkeleton";

const MyFavourites = () => {
  // *Context States
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // *Data State
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);

  // *Delete State
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // *Pagination States
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  // // *Fetch Cars With Queries
  // useEffect(() => {
  //   const getCars = async () => {
  //     try {
  //       setLoading(true);
  //       window.scrollTo(0, 0);

  //       // *Fetching
  //       const { data } = await axiosSecure(`/mycars/${user?.email}`);
  //       setCars(data.cars);
  //       setTotalItems(data.totalCount || 0);
  //       setTotalPages(data.totalPages);
  //     } catch (e) {
  //       toast.error(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getCars();
  // }, [axiosSecure, user?.email]);

  // *Handle Pagination
  // const handlePageChange = ({ selected }) => {
  //   setCurrentPage(selected);
  //   window.scrollTo(0, 0);
  // };

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
    <div className="aside-layout">
      <title>My Favourite Biodata | Pathway</title>
      <PageHeading
        heading={"My Favourite Biodata"}
        text={"Save and revisit your preferred profiles"}
      />
      <div>
        {loading ? (
          <DashboardSkeleton />
        ) : cars.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table-container min-w-full">
              <thead className="table-head">
                <tr>
                  {[
                    "Image",
                    "Model",
                    "Daily Price",
                    "Bookings",
                    "Availability",
                    "Date Added",
                    "Actions",
                  ].map((heading, index) => (
                    <th key={index}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {cars.map((car) => (
                    <motion.tr
                      key={car._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td>
                        <div className="h-10 w-16 flex-shrink-0">
                          <img
                            className="h-10 w-16 rounded object-cover"
                            src={car.photoURL}
                            alt={car.name}
                          />
                        </div>
                      </td>
                      <td>
                        <div>{car.name}</div>
                      </td>
                      <td>
                        <div>${car.price}</div>
                      </td>
                      <td>
                        <div>{car.rent_count}</div>
                      </td>
                      <td>
                        <div
                          className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                            (car.pickupDate, car.returnDate)
                              ? "text-success bg-green-100"
                              : "text-error bg-red-100"
                          }`}
                        >
                          {(car.pickupDate, car.returnDate)
                            ? "Available"
                            : "Unavailable"}
                        </div>
                      </td>
                      <td>{(new Date(car.dateAdded), "dd-MM-yyyy")}</td>
                      {/* Action Buttons */}
                      <td>
                        <div className="flex gap-3">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-warning hover:text-warning-hover"
                          >
                            <Link to={`/updatecar/${car._id}`}>
                              <FiEdit className="h-5 w-5" />
                            </Link>
                          </motion.div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              setDeleteConfirmation({
                                id: car._id,
                                name: car.name,
                              })
                            }
                            className="text-error hover:text-error-hover"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </motion.button>
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
            <h3 className="mb-4">You haven't added any cars yet</h3>
            <Link to="/allcars">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex-centric mx-auto w-fit gap-2"
              >
                <FiPlus />
                Add Your First Car
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyFavourites;

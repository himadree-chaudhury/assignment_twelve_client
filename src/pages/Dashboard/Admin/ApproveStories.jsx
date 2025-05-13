// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardSkeleton from "../Common/DashboardSkeleton";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ApproveStories = () => {
  // *Context States
  const MySwal = withReactContent(Swal);
  const axiosSecure = useAxiosSecure();

  // *Delete State
  // const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // *Fetch Favourite List
  const { data: stories, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data } = await axiosSecure("/success-stories");
      return data;
    },
  });

  // *Handle story
  const viewStory = (story) => {
    MySwal.fire({
      title: story.title,
      html: (
        <div className="z-[1000000] space-y-3 text-left">
          <p>
            <strong>Review:</strong> {story.review} out of 5
          </p>
          <img
            src={story.image}
            alt={story.title}
            style={{ maxWidth: "100%", marginTop: "10px" }}
            className="rounded-lg"
          />
          <p>
            <strong>Story ID:</strong> {story.storyId}
          </p>
          <p>
            <strong>Marriage Date:</strong>{" "}
            {new Date(story.marriageDate).toLocaleDateString()}
          </p>
          <div className="flex gap-2">
            <p>
              <strong>Male Biodata ID:</strong> {story.maleBiodataId}
            </p>
            <p>
              <strong>Female Biodata ID:</strong> {story.femaleBiodataId}
            </p>
          </div>
          <p>
            <strong>Story:</strong> {story.story}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(story.createdAt).toLocaleDateString()}
          </p>
        </div>
      ),
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  return (
    <div>
      <title>Success Story | Pathway</title>
      <PageHeading
        heading={"Success Story"}
        text={"View All stories at a glance"}
      />
      <div>
        {isLoading ? (
          <DashboardSkeleton />
        ) : stories.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table-container min-w-full">
              <thead className="table-head">
                <tr>
                  {["Male Biodata ID", "Female Biodata ID", "View Story"].map(
                    (heading, index) => (
                      <th key={index}>{heading}</th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {stories.map((story) => (
                    <motion.tr
                      key={story._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td>
                        <div>{story.maleBiodataId}</div>
                      </td>
                      <td>
                        <div>{story.femaleBiodataId}</div>
                      </td>
                      <td>
                        <motion.button
                          onClick={() => viewStory(story)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-success hover:text-success-hover"
                        >
                          <FiEye className="h-5 w-5" />
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

export default ApproveStories;

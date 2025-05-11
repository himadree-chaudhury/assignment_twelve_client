import { FiStar } from "react-icons/fi";
import { Link } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const StoryCard = ({ story }) => {
  const MySwal = withReactContent(Swal);

  // *Handle story
  const storyView = (story) => {
    MySwal.fire({
      title: story.title,
      html: (
        <div className="space-y-3 text-left">
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
        </div>
      ),
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  return (
    <div className="flex max-w-sm flex-col rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
      {/* Story Image */}
      <img
        className="h-48 w-full rounded-t-lg object-cover"
        src={story.image || "https://via.placeholder.com/300x200"}
        alt={story.title}
      />

      {/* Card Body */}
      <div className="card flex grow flex-col">
        {/* Couple Names */}
        <h3 className="mb-2">{story.title}</h3>

        {/* Marriage Details */}
        <div className="grow">
          <ul className="mb-2 space-y-1 text-sm">
            <li>
              <strong>Married On:</strong>{" "}
              {new Date(story.marriageDate).toLocaleDateString()}
            </li>
            <li className="flex-centric justify-start gap-2">
              <strong>Rating:</strong>{" "}
              <span className="text-primary flex-centric w-fit justify-start gap-2 rounded bg-pink-100 px-2.5 py-0.5 text-xs font-medium">
                <FiStar /> {story.review}
              </span>
            </li>
          </ul>

          {/* Story Description */}
          <p className="text-text-secondary dark:text-text-secondary-dark mt-3 mb-2 line-clamp-2 text-sm">
            {story.story}
          </p>
        </div>

        {/* Read More Link */}
        <Link
          onClick={() => storyView(story)}
          className="text-primary hover:text-primary-hover text-sm font-medium"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default StoryCard;

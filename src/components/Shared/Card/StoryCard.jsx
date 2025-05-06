import React from "react";
import { FiStar } from "react-icons/fi";
import { Link } from "react-router";

const StoryCard = ({ story }) => {
  return (
    <div className="flex max-w-sm flex-col rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
      {/* Story Image */}
      <img
        className="h-48 w-full rounded-t-lg object-cover"
        src={story.image || "https://via.placeholder.com/300x200"}
        alt={story.title}
      />

      {/* Card Body */}
      <div className="card grow">
        {/* Couple Names */}
        <h3 className="mb-2">{story.title}</h3>

        {/* Marriage Details */}
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

        {/* Read More Link */}
        <Link
          to={`/success-story/${story._id}`}
          className="text-primary hover:text-primary-hover text-sm font-medium"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default StoryCard;

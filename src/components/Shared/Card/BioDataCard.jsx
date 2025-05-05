import React from "react";
import { Link } from "react-router";

const BioDataCard = ({ bio: biodata }) => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 shadow-md transition-shadow duration-300 hover:shadow-lg">
      {/* Profile Image */}
      <img
        className="rounded-t-lg object-cover"
        src={biodata.profileImage || "https://via.placeholder.com/300x200"}
        alt={`${biodata.name}'s profile`}
      />

      {/* Card Body */}
      <div className="card">
        {/* Name and Premium Badge */}
        <div className="mb-2 flex items-center justify-between">
          <h3>{biodata.name}</h3>
          {biodata.isPremium && (
            <span className="text-primary rounded bg-pink-100 px-2.5 py-0.5 text-xs font-medium">
              Premium
            </span>
          )}
        </div>

        {/* Biodata Details */}
        <ul className="space-y-1 text-sm">
          <li>
            <strong>BiodataID:</strong> {biodata.biodataId}
          </li>
          <li>
            <strong>Gender:</strong> {biodata.biodataType}
          </li>
          <li>
            <strong>Age:</strong> {biodata.age}
          </li>
          <li>
            <strong>Division:</strong> {biodata.presentDivision}
          </li>
          <li>
            <strong>Occupation:</strong> {biodata.occupation}
          </li>
        </ul>

        {/* Description */}
        <p className="text-text-secondary dark:text-text-secondary-dark mt-3 line-clamp-2 text-sm">
          {biodata.description}
        </p>

        {/* View Details Button */}
        <Link to={`/biodata-details/${biodata._id}`}>
          <button className="btn-primary my-2 w-full">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default BioDataCard;

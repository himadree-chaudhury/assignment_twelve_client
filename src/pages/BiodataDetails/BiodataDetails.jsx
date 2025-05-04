import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import LoadingSpinner from "../../components/Shared/Utilities/LoadingSpinner";
import BioDataCard from "../../components/Shared/Card/BioDataCard";

const BiodataDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [isFavourite, setIsFavourite] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const { data: biodata, isLoading } = useQuery({
    queryKey: ["bioDetails", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata/${id}`);
      return data;
    },
  });

  console.log(biodata);

  // Dummy data for similar biodatas (replace with API call in real implementation)
  const similarBiodatas = [
    {
      biodataId: 2,
      name: "Rahim Khan",
      age: 34,
      occupation: "Doctor",
      height: 175,
      presentDivision: "Dhaka",
      religion: "Muslim",
      profileImage: "https://example.com/images/rahim-profile.jpg",
      description:
        "Dedicated doctor with a caring nature, enjoys helping others...",
    },
    {
      biodataId: 3,
      name: "Sadia Islam",
      age: 27,
      occupation: "Teacher",
      height: 158,
      presentDivision: "Sylhet",
      religion: "Muslim",
      profileImage: "https://example.com/images/sadia-profile.jpg",
      description: "A cheerful teacher who loves educating young minds...",
    },
    {
      biodataId: 4,
      name: "Arif Hossain",
      age: 37,
      occupation: "Businessman",
      height: 170,
      presentDivision: "Barisal",
      religion: "Muslim",
      profileImage: "https://example.com/images/arif-profile.jpg",
      description: "Successful businessman with a love for adventure...",
    },
  ].slice(0, 3); // Limit to 3

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="section-layout">
      {/* Header Section with Favourite Button */}
      <div className="mb-6 flex flex-col items-start justify-between md:flex-row lg:items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {biodata.name}'s Profile
          </h1>
        </div>
        {biodata.isPremium && (
          <span className="text-primary rounded-full bg-pink-100 px-3 py-1 text-sm font-medium">
            Premium Member
          </span>
        )}
      </div>

      {/* Profile Image and Basic Info */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Image */}
        <div className="h-96 w-full">
          <img
            className="h-full w-full rounded-lg object-cover shadow-md"
            src={biodata.profileImage || "https://via.placeholder.com/400x300"}
            alt={`${biodata.name}'s profile`}
          />
        </div>

        {/* Basic Details */}
        <div className="space-y-4">
          <p>
            <strong>Type:</strong> {biodata.biodataType}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(biodata.dateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <strong>Age:</strong> {biodata.age} years
          </p>
          <p>
            <strong>Height:</strong> {biodata.height} cm
          </p>
          <p>
            <strong>Weight:</strong> {biodata.weight} kg
          </p>
          <p>
            <strong>Occupation:</strong> {biodata.occupation}
          </p>
          <p>
            <strong>Race:</strong> {biodata.race}
          </p>
          <p>
            <strong>Religion:</strong> {biodata.religion}
          </p>
          <button
            className={`rounded-full p-2 ${
              isFavourite
                ? "text-primary bg-fuchsia-200"
                : "bg-text-secondary-dark text-text-secondary hover:bg-pink-200"
            } transition-colors`}
            onClick={() => setIsFavourite(!isFavourite)}
          >
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Additional Details */}
      <div className="mt-8 rounded-lg bg-gray-50 p-6 shadow-inner">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          More Details
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <p>
            <strong>Father's Name:</strong> {biodata.fathersName}
          </p>
          <p>
            <strong>Mother's Name:</strong> {biodata.mothersName}
          </p>
          <p>
            <strong>Permanent Division:</strong> {biodata.permanentDivision}
          </p>
          <p>
            <strong>Present Division:</strong> {biodata.presentDivision}
          </p>
          <p>
            <strong>Biodata Created:</strong>{" "}
            {new Date(biodata.biodataCreatedTime).toLocaleDateString()}
          </p>
          <p>
            <strong>Biodata ID:</strong> {biodata.biodataId}
          </p>
        </div>
      </div>

      {/* Partner Preferences */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Partner Preferences
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <p>
            <strong>Age:</strong> {biodata.expectedPartnerAge} years
          </p>
          <p>
            <strong>Height:</strong> {biodata.expectedPartnerHeight} cm
          </p>
          <p>
            <strong>Weight:</strong> {biodata.expectedPartnerWeight} kg
          </p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mt-8 rounded-lg bg-gray-50 p-6 shadow-inner">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Contact Information
        </h2>
        {biodata.isPremium ? (
          showContact ? (
            <div className="space-y-2">
              <p>
                <strong>Contact Email:</strong> {biodata.contactEmail}
              </p>
              <p>
                <strong>Mobile Number:</strong> {biodata.mobileNumber}
              </p>
            </div>
          ) : (
            <button
              className="btn-primary"
              onClick={() => setShowContact(true)}
            >
              Request Contact Information
            </button>
          )
        ) : (
          <p className="text-gray-500">
            <div className="space-y-2">
              <p>
                <strong>Contact Email:</strong> {biodata.contactEmail}
              </p>
              <p>
                <strong>Mobile Number:</strong> {biodata.mobileNumber}
              </p>
            </div>
          </p>
        )}
      </div>

      {/* About Me */}
      <div className="mt-8 rounded-lg bg-gray-50 p-6 shadow-inner">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">About Me</h2>
        <p className="mb-4 text-gray-700">{biodata.description}</p>
      </div>

      {/* Similar Biodatas Section */}
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Similar Profiles
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similarBiodatas.map((similarBiodata) => (
            <BioDataCard key={similarBiodata.biodataId} bio={similarBiodata} />
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <button className="btn-primary" onClick={() => window.history.back()}>
          Back to List
        </button>
      </div>
    </div>
  );
};

export default BiodataDetails;

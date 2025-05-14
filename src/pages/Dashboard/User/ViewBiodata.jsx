import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import {
  FiDollarSign,
  FiUser,
  FiCalendar,
  FiBriefcase,
  FiPhone,
  FiFileText,
  FiHeart,
  FiDatabase,
} from "react-icons/fi";
import DashboardSkeleton from "../Common/DashboardSkeleton";
import Swal from "sweetalert2";

const ViewBiodata = () => {
  const { dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  // *Fetch biodata details
  const {
    data: biodata,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["self-biodata", dbUser?.email],
    queryFn: async () => {
      if (!dbUser?.email) return null;
      const { data } = await axiosSecure(`/self-biodata`);
      return data || null;
    },
    enabled: !!dbUser?.email,
  });

  // *Handle premium request
  const handleMakePremium = async (biodata) => {
    const { data } = await axiosSecure("/already-requested");

    if (data) {
      toast.error("This Biodata Is Already Premium!");
      return;
    }

    // *Post request
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axiosSecure.post("/premium-request", {
            requestedName: biodata.name,
            requestedBiodataId: biodata.biodataId,
          });
        } catch (error) {
          toast.error(error);
        } finally {
          refetch();
          toast.success("Request Successful");
          setLoading(false);
        }
      }
    });
  };

  return (
    <div>
      <title>View Biodata | Pathway</title>
      <PageHeading
        heading={"View Biodata"}
        text={"Discover potential partners at a glance"}
      />
      {/* Biodata Details */}
      <div className="card p-6">
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <div>
            {biodata ? (
              <div>
                {/* Profile Image */}
                <div className="mb-6 flex justify-center">
                  <img
                    src={
                      biodata.profileImage || "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="border-primary h-32 w-32 rounded-full border-4 object-cover"
                  />
                </div>
                {/* Basic Information */}
                <div className="mb-6 rounded-lg p-4">
                  <h3 className="text-primary mb-3 flex items-center text-lg font-semibold">
                    <FiUser className="mr-2" /> Basic Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <p>
                      <strong>Name:</strong> {biodata.name}
                    </p>
                    <p>
                      <strong>Biodata Type:</strong> {biodata.biodataType}
                    </p>
                    <p>
                      <strong>Father's Name:</strong> {biodata.fathersName}
                    </p>
                    <p>
                      <strong>Mother's Name:</strong> {biodata.mothersName}
                    </p>
                    <p>
                      <strong>Permanent Division:</strong>{" "}
                      {biodata.permanentDivision}
                    </p>
                    <p>
                      <strong>Present Division:</strong>{" "}
                      {biodata.presentDivision}
                    </p>
                  </div>
                </div>

                {/* Identification */}
                <div className="mb-6 rounded-lg p-4">
                  <h3 className="text-accent mb-3 flex items-center text-lg font-semibold">
                    <FiCalendar className="mr-2" /> Identification
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      {new Date(biodata.dateOfBirth).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Age:</strong> {biodata?.age || "Not specified"}
                    </p>
                    <p>
                      <strong>Height:</strong> {biodata.height} cm
                    </p>
                    <p>
                      <strong>Weight:</strong> {biodata.weight} kg
                    </p>
                    <p>
                      <strong>Race:</strong> {biodata.race}
                    </p>
                  </div>
                </div>

                {/* Lifestyle */}
                <div className="mb-6 rounded-lg p-4">
                  <h3 className="text-success mb-3 flex items-center text-lg font-semibold">
                    <FiBriefcase className="mr-2" /> Lifestyle
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <p>
                      <strong>Occupation:</strong> {biodata.occupation}
                    </p>
                    <p>
                      <strong>Religion:</strong>{" "}
                      {biodata.religion || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Expectations */}
                <div className="mb-6 rounded-lg p-4">
                  <h3 className="text-error mb-3 flex items-center text-lg font-semibold">
                    <FiHeart className="mr-2" /> Expectations
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <p>
                      <strong>Expected Partner Age:</strong>{" "}
                      {biodata.expectedPartnerAge || "Not specified"}
                    </p>
                    <p>
                      <strong>Expected Partner Height:</strong>{" "}
                      {biodata.expectedPartnerHeight} cm
                    </p>
                    <p>
                      <strong>Expected Partner Weight:</strong>{" "}
                      {biodata.expectedPartnerWeight} kg
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-6 rounded-lg p-4">
                  <h3 className="text-warning mb-3 flex items-center text-lg font-semibold">
                    <FiPhone className="mr-2" /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <p>
                      <strong>Email:</strong> {biodata.contactEmail}
                    </p>
                    <p>
                      <strong>Mobile Number:</strong> {biodata.mobileNumber}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6 rounded-lg p-4">
                  <h3 className="text-accent-hover mb-3 flex items-center text-lg font-semibold">
                    <FiFileText className="mr-2" /> Description
                  </h3>
                  <p>{biodata.description || "No description provided."}</p>
                </div>

                {/* Metadata */}
                <div className="mb-6 rounded-lg p-4">
                  <h3 className="text-success-hover mb-3 flex items-center text-lg font-semibold">
                    <FiDatabase className="mr-2" /> Metadata
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <p>
                      <strong>Biodata ID:</strong> {biodata.biodataId}
                    </p>
                    <p>
                      <strong>Premium Status:</strong>{" "}
                      <span
                        className={`rounded px-2.5 py-0.5 text-sm font-medium ${biodata?.isPremium ? "text-primary bg-pink-100" : "text-text-secondary bg-gray-200"}`}
                      >
                        {" "}
                        {biodata.isPremium ? "Premium" : "Not Premium"}
                      </span>
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(biodata.biodataCreatedTime).toLocaleString()}
                    </p>
                    {biodata?.biodataUpdatedTime && (
                      <p>
                        <strong>Last Update At:</strong>{" "}
                        {new Date(biodata.biodataUpdatedTime).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Make Premium Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => handleMakePremium(biodata)}
                    className={`btn-primary flex-centric`}
                  >
                    <FiDollarSign className="mr-2" />
                    {loading ? "Processing..." : "Make Biodata Premium"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center">
                You haven't upload your biodata yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBiodata;

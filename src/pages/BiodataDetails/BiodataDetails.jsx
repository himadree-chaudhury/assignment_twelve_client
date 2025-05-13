import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "../../components/Shared/Utilities/LoadingSpinner";
import BioDataCard from "../../components/Shared/Card/BioDataCard";
import { GiSelfLove } from "react-icons/gi";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const BiodataDetails = () => {
  const { dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);
  // const [showContact, setShowContact] = useState(false);

  // *fetch data using query

  const { data: { biodata, similarBiodata } = {}, isLoading } = useQuery({
    queryKey: ["bioDetails", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata/${id}`);
      return {
        biodata: data.biodata || null,
        similarBiodata: data.similarBiodata || null,
      };
    },
    enabled: !!id,
  });

  // *match user favourite & contact list data with biodata
  useEffect(() => {
    if (biodata && dbUser) {
      setIsFavourite(
        dbUser.favouriteIDs.includes(biodata.biodataId.toString()),
      );
    }
  }, [biodata, dbUser]);

  // *handle add biodata to favourite list
  const handleFavourite = async () => {
    try {
      await axiosSecure.post(`/add-favourite/${biodata?.biodataId}`);
    } catch (error) {
      toast.error(error);
    } finally {
      toast.success("Biodata Added To Favourite !");
      setIsFavourite(true);
    }
  };

  // *handle premium contact request
  const handlePremiumContactRequest = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You have to pay $5 to see this premium contact!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.post(`/contact-request/${biodata?.biodataId}`);
        } catch (error) {
          toast.error(error);
        } finally {
          toast.success("Contact Request Successfully Placed !");
          navigate("/dashboard/contact-request");
        }
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="section-layout">
      {/* Header Section with Favourite Button */}
      <div className="mb-6 flex flex-col items-start justify-between md:flex-row lg:items-center">
        <div className="flex items-center space-x-4">
          <h2>{biodata.name}'s Profile</h2>
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
        <div className="w-full xl:h-96">
          <img
            className="h-full w-full rounded-lg object-cover shadow-md"
            src={biodata.profileImage || "https://via.placeholder.com/400x300"}
            alt={`${biodata.name}'s profile`}
          />
        </div>

        {/* Basic Details */}
        <div className="card flex flex-col gap-4">
          <div className="grow space-y-6 xl:space-y-4">
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
              <strong>Color:</strong> {biodata.race}
            </p>
            <p>
              <strong>Religion:</strong> {biodata.religion}
            </p>
          </div>
          <button
            disabled={isFavourite}
            onClick={() => handleFavourite()}
            className="btn-primary group flex w-fit items-center gap-2"
          >
            <strong>
              {isFavourite ? "Added To Favorite" : "Add To Favourite"}
            </strong>
            <span
              className={`rounded-full p-2 ${
                isFavourite
                  ? "text-primary bg-fuchsia-200"
                  : "bg-text-secondary-dark text-text-secondary group-hover:bg-pink-200"
              } transition-colors`}
            >
              <GiSelfLove />
            </span>
          </button>
        </div>
      </div>

      {/* Additional Details */}
      <div className="card mt-8">
        <h3 className="mb-4 text-center">More Details</h3>
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
      <div className="card mt-8">
        <h3 className="mb-4 text-center">Partner Preferences</h3>
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
      <div className="card mt-8">
        <h3 className="mb-4 text-center">Contact Information</h3>
        {biodata.isPremium ? (
          <button
            className="btn-primary"
            onClick={() => handlePremiumContactRequest()}
          >
            Request Contact Information
          </button>
        ) : (
          <div className="space-y-2">
            <p>
              <strong>Contact Email:</strong> {biodata.contactEmail}
            </p>
            <p>
              <strong>Mobile Number:</strong> {biodata.mobileNumber}
            </p>
          </div>
        )}
      </div>

      {/* About Me */}
      <div className="card mt-8">
        <h3 className="mb-4 text-center">About Me</h3>
        <p className="mb-4">{biodata.description}</p>
      </div>

      {/* Similar Biodatas Section */}
      <div className="mt-8">
        <h3 className="mb-4 text-center">Similar Profiles</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similarBiodata.map((similarBio) => (
            <BioDataCard key={similarBio.biodataId} bio={similarBio} />
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

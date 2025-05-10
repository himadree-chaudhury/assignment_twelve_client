import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEdit, FiUpload, FiUser, FiMail, FiShield } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/imageUpload";
import cover from "../../../assets/banner4.jpg";

const UserProfile = () => {
  const { dbUser: user, updateUserProfile } = useAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateUserProfile(data.displayName, user.photoURL);
      await axiosSecure.patch(`/users/${user.email}`, {
        displayName: data.displayName,
      });
      toast.success("Name updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || "Failed to update name");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const imageUrl = await imageUpload(file);
      await updateUserProfile(user.displayName, imageUrl);
      await axiosSecure.patch(`/users/${user.email}`, {
        photoURL: imageUrl,
      });
      toast.success("Profile image updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <div className="aside-layout">
      <title>User Profile | Pathway</title>
      <div className="relative">
        {/* Cover Image */}
        <div className="w-full">
          <img
            src={cover}
            alt="Cover"
            className="h-72 w-screen rounded-t-lg object-cover"
          />
        </div>

        {/* Profile Image */}
        <div className="absolute top-56 left-4">
          <img
            referrerPolicy="no-referrer"
            src={user?.photoURL}
            alt={user?.displayName}
            className="border-secondary h-32 w-32 rounded-full border-4 object-cover shadow-md"
          />
        </div>
      </div>

      <div className="card rounded-t-none rounded-b-lg p-6 pt-16">
        {/* User Details */}
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            {isEditing ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-start gap-2 space-x-2 md:flex-row"
              >
                <input
                  type="text"
                  {...register("displayName", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  className={`rounded border px-4 py-[7px] ${
                    errors.displayName && "border-error focus:ring-error"
                  }`}
                />
                {errors.displayName && (
                  <p className="error-massage text-sm text-red-500">
                    {errors.displayName.message}
                  </p>
                )}
                <div className="flex-centric gap-2">
                  <button
                    type="submit"
                    className="btn-primary bg-success hover:bg-success-hover py-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-primary bg-error hover:bg-error-hover py-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="flex items-center text-2xl font-semibold">
                  <FiUser className="mr-2" /> {user?.displayName}
                </h2>
              </>
            )}
          </div>

          <p className="flex items-center">
            <FiMail className="mr-2" /> <strong className="mr-2">Email:</strong>
            {user?.email}
          </p>
          <p className="flex items-center">
            <FiShield className="mr-2" />
            <strong className="mr-2">Role:</strong>
            {user?.role}
          </p>
        </div>

        {/* Update Image Button */}
        <div className="mt-6 flex w-fit flex-col gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="btn-accent flex-centric"
          >
            <FiEdit className="mr-2" /> Update Name
          </button>
          <label className="btn-accent flex-centric cursor-pointer font-bold">
            <FiUpload className="mr-2" />
            {isUploadingImage ? "Uploading..." : "Update Profile Image"}
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiCheck,
  FiEye,
  FiFileText,
  FiImage,
  FiInfo,
  FiList,
  FiPhone,
  FiRss,
  FiUpload,
  FiUser,
  FiWind,
} from "react-icons/fi";
import { useState } from "react";
import { imageUpload } from "../../../api/imageUpload";

const GotMarried = () => {
  const navigate = useNavigate();
  // *Context States
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [uploadImage, setUploadImage] = useState({
    image: { name: "Upload Image" },
  });

  // *Hook Form States
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // *Handles Form Submission
  const onSubmit = async (data) => {
    console.log(data);
    try {
      // *Upload the image to ImgBB
      const imageFile = data.profileImage[0];
      const imageUrl = await imageUpload(imageFile);

      setUploadImage({
        image: imageFile,
        url: imageUrl,
      });
      console.log(uploadImage);

      await axiosSecure.post(`/add-biodata`, {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        age: Number(data.age),
        height: Number(data.height),
        weight: Number(data.weight),
        profileImage: imageUrl,
        expectedPartnerAge: Number(data.expectedPartnerAge),
        expectedPartnerHeight: Number(data.expectedPartnerHeight),
        expectedPartnerWeight: Number(data.expectedPartnerWeight),
        biodataCreatedTime: new Date(),
      });

      toast.success("Car Added Successfully!");
      navigate("");
    } catch (e) {
      toast.error(e);
    }
  };

  // *Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 },
    },
  };
  return (
    <div className="">
      <title>Got Married | Pathway</title>
      <div className="">
        <PageHeading
          heading={"Celebrate Your Marriage"}
          text={"Share your success story with the Pathway community"}
        />

        {/* biodata input form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="card"
          variants={containerVariants}
        >
          {/* Basic title Section */}
          <motion.div variants={itemVariants} className="mb-6 rounded-lg p-4">
            <h3 className="text-primary mb-3 flex items-center text-lg font-semibold">
              <FiRss className="mr-2" /> Story Head
            </h3>

            <div className="space-y-4">
              {/* title input */}
              <div>
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  defaultValue={user?.displayName}
                  {...register("name", {
                    required: "Name Is Required",
                    minLength: {
                      value: 3,
                      message: "Name Must Be At Least 3 Characters",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.name && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. Himadree Chaudhury"
                />
                {errors.name && (
                  <p className="error-massage">{errors.name.message}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* info Section */}
          <motion.div variants={itemVariants} className="mb-6 rounded-lg p-4">
            <h3 className="text-success mb-3 flex items-center text-lg font-semibold">
              <FiInfo className="mr-2" /> Marriage Info
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* maleBiodataId input */}
              <div>
                <label htmlFor="height">Height(cm) *</label>
                <input
                  type="number"
                  id="height"
                  {...register("height", {
                    required: "Height Is Required",
                    min: {
                      value: 1,
                      message: "Height Must Be Greater Than 0",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.height && "border-error focus:ring-error"
                  } `}
                  placeholder="170"
                />
                {errors.height && (
                  <p className="error-massage">{errors.height.message}</p>
                )}
              </div>

              {/* femaleBiodataId input */}
              <div>
                <label htmlFor="weight">Weight(kg) *</label>
                <input
                  type="number"
                  id="weight"
                  {...register("weight", {
                    required: "Weight Is Required",
                    min: {
                      value: 1,
                      message: "Wight Must Be Greater Than 0",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.weight && "border-error focus:ring-error"
                  } `}
                  placeholder="50"
                />
                {errors.weight && (
                  <p className="error-massage">{errors.weight.message}</p>
                )}
              </div>

              {/* marriageDate input */}
              <div>
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  {...register("dateOfBirth", {
                    required: "Date of Birth Is Required",
                  })}
                  className={`border px-4 py-2 ${
                    errors.dateOfBirth && "border-error focus:ring-error"
                  } `}
                />
                {errors.dateOfBirth && (
                  <p className="error-massage">{errors.dateOfBirth.message}</p>
                )}
              </div>

              {/* review input */}
              <div>
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  {...register("age")}
                  className={`border px-4 py-2 ${
                    errors.age && "border-error focus:ring-error"
                  } `}
                  placeholder="23"
                />
                {errors.age && (
                  <p className="error-massage">{errors.age.message}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* image Section */}
          <motion.div variants={itemVariants} className="mb-6 rounded-lg p-4">
            <h3 className="text-warning mb-3 flex items-center text-lg font-semibold">
              <FiImage className="mr-2" /> Couple Image
            </h3>

            {/* image input */}
            <div className="border-primary rounded-lg border-3 border-dotted px-5 py-3">
              <div className="mx-auto flex w-max flex-col text-center">
                <label>
                  <input
                    className="hidden w-36 cursor-pointer text-sm"
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    accept="image/*"
                    hidden
                    {...register("profileImage")}
                  />
                  <div className="bg-primary hover:bg-primary-hover flex-centric cursor-pointer gap-2 rounded px-5 py-2 font-semibold text-white">
                    <FiUpload className="text-xl" />
                    {uploadImage?.image?.name}
                    {/* {shortImageName(uploadImage?.image)} */}
                  </div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* story section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="rounded-lg p-4">
              <h3 className="text-accent-hover mb-3 flex items-center text-lg font-semibold">
                <FiFileText className="mr-2" /> Success Story
              </h3>

              {/* description input */}
              <div>
                <label htmlFor="description">Personal Description </label>
                <textarea
                  id="description"
                  {...register("description")}
                  className={`border px-4 py-2 ${
                    errors.description && "border-error focus:ring-error"
                  } `}
                  rows={4}
                  placeholder="e.g. I am a passionate software engineer who loves coding and exploring new technologies. Seeking a kind-hearted partner who values family and growth."
                />
                {errors.description && (
                  <p className="error-massage">{errors.description.message}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="flex-centric mt-8">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex-centric"
            >
              <FiCheck className="mr-2" />
              Save & Publish
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default GotMarried;

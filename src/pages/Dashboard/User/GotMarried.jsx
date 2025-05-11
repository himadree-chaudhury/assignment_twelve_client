// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FiCheck,
  FiCheckCircle,
  FiFileText,
  FiImage,
  FiInfo,
  FiRss,
  FiUpload,
} from "react-icons/fi";
import { useState } from "react";
import { imageUpload } from "../../../api/imageUpload";
import HoverRating from "../../../components/Dashboard/Form/HoverRating";

const GotMarried = () => {
  const navigate = useNavigate();
  // *Context States
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(2);

  const [uploadImage, setUploadImage] = useState({
    image: { name: "Upload Image" },
  });

  // *handle rating
  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };

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
      const imageFile = data.image[0];
      const imageUrl = await imageUpload(imageFile);

      setUploadImage({
        image: imageFile,
        url: imageUrl,
      });
      console.log(uploadImage);

      await axiosSecure.post(`/got-married`, {
        ...data,
        marriageDate: new Date(data.marriageDate).toISOString(),
        maleBiodataId: Number(data.maleBiodataId),
        femaleBiodataId: Number(data.femaleBiodataId),
        image: imageUrl,
        review: rating,
        createdAt: new Date(),
      });
      Swal.fire({
        text: "That thing is still around?",
        icon: "success",
      });
      navigate("/");
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
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  {...register("title", {
                    required: "Title Is Required",
                    minLength: {
                      value: 3,
                      message: "Title Must Be At Least 3 Characters",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.title && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. Filters Lead to Joyous Marriage"
                />
                {errors.title && (
                  <p className="error-massage">{errors.title.message}</p>
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
                <label htmlFor="maleBiodataId">Male Biodata ID *</label>
                <input
                  type="number"
                  id="maleBiodataId"
                  {...register("maleBiodataId", {
                    required: "Male Biodata ID Is Required",
                    min: {
                      value: 1,
                      message: "Male Biodata ID Must Be Greater Than 0",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.maleBiodataId && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. 17"
                />
                {errors.maleBiodataId && (
                  <p className="error-massage">
                    {errors.maleBiodataId.message}
                  </p>
                )}
              </div>

              {/* femaleBiodataId input */}
              <div>
                <label htmlFor="femaleBiodataId">Female Biodata ID *</label>
                <input
                  type="number"
                  id="femaleBiodataId"
                  {...register("femaleBiodataId", {
                    required: "Female Biodata ID Is Required",
                    min: {
                      value: 1,
                      message: "Wight Must Be Greater Than 0",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.femaleBiodataId && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. 15"
                />
                {errors.femaleBiodataId && (
                  <p className="error-massage">
                    {errors.femaleBiodataId.message}
                  </p>
                )}
              </div>

              {/* marriageDate input */}
              <div>
                <label htmlFor="marriageDate">Marriage Date *</label>
                <input
                  type="date"
                  id="marriageDate"
                  {...register("marriageDate", {
                    required: "Marriage Date Is Required",
                  })}
                  className={`border px-4 py-2 ${
                    errors.marriageDate && "border-error focus:ring-error"
                  } `}
                />
                {errors.marriageDate && (
                  <p className="error-massage">{errors.marriageDate.message}</p>
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
                    name="image"
                    id="image"
                    accept="image/*"
                    hidden
                    {...register("image")}
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
                <label htmlFor="story">Story </label>
                <textarea
                  id="story"
                  {...register("story")}
                  className={`border px-4 py-2 ${
                    errors.story && "border-error focus:ring-error"
                  } `}
                  rows={4}
                  placeholder="e.g. Arif and Emma connected through shared family values. Their Pathway journey ended in a heartfelt wedding ceremony."
                />
                {errors.story && (
                  <p className="error-massage">{errors.story.message}</p>
                )}
              </div>
            </div>
          </motion.div>
          {/* story section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="rounded-lg p-4">
              <h3 className="text-error mb-3 flex items-center text-lg font-semibold">
                <FiCheckCircle className="mr-2" /> Rate The Platform
              </h3>

              {/* review input */}
              <div>
                <HoverRating value={rating} onChange={handleRatingChange} />
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
              Submit Story
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default GotMarried;

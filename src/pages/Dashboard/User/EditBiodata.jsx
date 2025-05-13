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
  FiList,
  FiPhone,
  FiUpload,
  FiUser,
  FiWind,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { imageUpload } from "../../../api/imageUpload";
import { useQuery } from "@tanstack/react-query";

const EditBiodata = () => {
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
    reset,
    formState: { errors },
  } = useForm();

  // *Fetch biodata details
  const { data: biodata } = useQuery({
    queryKey: ["self-biodata", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const { data } = await axiosSecure(`/self-biodata`);
      return data || null;
    },
    enabled: !!user?.email,
  });

  // *Reset the filed value with sever response
  useEffect(() => {
    if (biodata) {
      reset({
        biodataType: biodata.biodataType,
        name: biodata.name,
        dateOfBirth: biodata.dateOfBirth.split("T")[0],
        height: biodata.height,
        weight: biodata.weight,
        age: biodata.age,
        occupation: biodata.occupation,
        race: biodata.race,
        religion: biodata.religion,
        fathersName: biodata.fathersName,
        mothersName: biodata.mothersName,
        permanentDivision: biodata.permanentDivision,
        presentDivision: biodata.presentDivision,
        expectedPartnerAge: biodata.expectedPartnerAge,
        expectedPartnerHeight: biodata.expectedPartnerHeight,
        expectedPartnerWeight: biodata.expectedPartnerWeight,
        mobileNumber: biodata.mobileNumber,
        description: biodata.description,
      });
    }
  }, [biodata, reset]);

  // *Handles Form Submission
  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (!biodata) {
        // *Upload the image to ImgBB
        const imageFile = data.profileImage[0];
        const imageUrl = await imageUpload(imageFile);

        setUploadImage({
          image: imageFile,
          url: imageUrl,
        });
        console.log(uploadImage);

        // *Post the biodata to database
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
      }
      if (biodata) {
        // *Update the existing biodata in database
        await axiosSecure.put(`/update-biodata/${biodata?._id}`, {
          ...data,
          dateOfBirth: new Date(data.dateOfBirth).toISOString(),
          age: Number(data.age),
          height: Number(data.height),
          weight: Number(data.weight),
          expectedPartnerAge: Number(data.expectedPartnerAge),
          expectedPartnerHeight: Number(data.expectedPartnerHeight),
          expectedPartnerWeight: Number(data.expectedPartnerWeight),
          biodataUpdatedTime: new Date(),
        });
      }
      toast.success(
        `${biodata ? "Biodata Update Successfully!" : "Biodata Added Successfully!"}`,
      );
      navigate("/dashboard/view-biodata");
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
    <div>
      <title>Edit Biodata | Pathway</title>
      <div>
        <PageHeading
          heading={"Edit Biodata"}
          text={`${biodata ? "You have already uploaded your profile. Edit to update" : "Add your profile to find the perfect match"}`}
        />

        {/* biodata input form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="card"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Basic Information Section */}
            <motion.div variants={itemVariants} className="mb-6 rounded-lg p-4">
              <h3 className="text-primary mb-3 flex items-center text-lg font-semibold">
                <FiUser className="mr-2" /> Basic Information
              </h3>

              <div className="space-y-4">
                {/* name input */}
                <div>
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={biodata?.name || user?.displayName}
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

                {/* fathers name input */}
                <div>
                  <label htmlFor="fathersName">Father's Name *</label>
                  <input
                    type="text"
                    id="fathersName"
                    {...register("fathersName", {
                      required: "Father's Name Is Required",
                      minLength: {
                        value: 3,
                        message: "Name Must Be At Least 3 Characters",
                      },
                    })}
                    className={`border px-4 py-2 ${
                      errors.fathersName && "border-error focus:ring-error"
                    } `}
                    placeholder="e.g. Sushanta Chaudhury"
                  />
                  {errors.fathersName && (
                    <p className="error-massage">{errors.name.message}</p>
                  )}
                </div>

                {/* mothers name input */}
                <div>
                  <label htmlFor="mothersName">Mother's Name *</label>
                  <input
                    type="text"
                    id="mothersName"
                    {...register("mothersName", {
                      required: "Mother's Name Is Required",
                      minLength: {
                        value: 3,
                        message: "Name Must Be At Least 3 Characters",
                      },
                    })}
                    className={`border px-4 py-2 ${
                      errors.mothersName && "border-error focus:ring-error"
                    } `}
                    placeholder="e.g. Supriya Chaudhury"
                  />
                  {errors.mothersName && (
                    <p className="error-massage">{errors.name.message}</p>
                  )}
                </div>

                {/* permanent division input */}
                <div>
                  <label htmlFor="permanentDivision">Permanent Address *</label>
                  <select
                    id="permanentDivision"
                    {...register("permanentDivision", {
                      required: "Permanent Address Is Required",
                    })}
                    className={`border px-4 py-2 ${
                      errors.permanentDivision &&
                      "border-error focus:ring-error"
                    } `}
                  >
                    <option value="">Select Division</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattagram">Chattagram</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Mymensingh">Mymensingh</option>
                    <option value="Sylhet">Sylhet</option>
                  </select>
                  {errors.permanentDivision && (
                    <p className="error-massage">
                      {errors.permanentDivision.message}
                    </p>
                  )}
                </div>

                {/* present division input */}
                <div>
                  <label htmlFor="presentDivision">Present Address *</label>
                  <select
                    id="presentDivision"
                    {...register("presentDivision", {
                      required: "Present Address Is Required",
                    })}
                    className={`border px-4 py-2 ${
                      errors.presentDivision && "border-error focus:ring-error"
                    } `}
                  >
                    <option value="">Select Division</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattagram">Chattagram</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Mymensingh">Mymensingh</option>
                    <option value="Sylhet">Sylhet</option>
                  </select>
                  {errors.presentDivision && (
                    <p className="error-massage">
                      {errors.presentDivision.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* identification Section */}
            <motion.div variants={itemVariants} className="mb-6 rounded-lg p-4">
              <h3 className="text-accent mb-3 flex items-center text-lg font-semibold">
                <FiEye className="mr-2" /> Identification
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* date of birth input */}
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
                    <p className="error-massage">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>

                {/* age input */}
                <div>
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    {...register("age")}
                    className={`border px-4 py-2 ${
                      errors.age && "border-error focus:ring-error"
                    } `}
                    placeholder="e.g. 23"
                  />
                  {errors.age && (
                    <p className="error-massage">{errors.age.message}</p>
                  )}
                </div>

                {/* height input */}
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
                    placeholder="e.g. 170"
                  />
                  {errors.height && (
                    <p className="error-massage">{errors.height.message}</p>
                  )}
                </div>

                {/* weight input */}
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
                    placeholder="e.g. 50"
                  />
                  {errors.weight && (
                    <p className="error-massage">{errors.weight.message}</p>
                  )}
                </div>

                {/* gender input*/}
                <div>
                  <label htmlFor="biodataType">Gender *</label>
                  <select
                    id="biodataType"
                    {...register("biodataType", {
                      required: "Type Is Required",
                    })}
                    className={`border px-4 py-2 ${
                      errors.biodataType && "border-error focus:ring-error"
                    } `}
                  >
                    <option value="">Select Type</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.biodataType && (
                    <p className="error-massage">
                      {errors.biodataType.message}
                    </p>
                  )}
                </div>

                {/* race input */}
                <div>
                  <label htmlFor="race">Race(Skin Color) *</label>
                  <input
                    id="race"
                    type="text"
                    {...register("race", {
                      required: "Race Is Required",
                      minLength: {
                        value: 2,
                        message: "Race Must Be At Least 2 Characters",
                      },
                    })}
                    className={`border px-4 py-2 ${
                      errors.race && "border-error focus:ring-error"
                    } `}
                    placeholder="e.g. Brown"
                  />
                  {errors.race && (
                    <p className="error-massage">{errors.race.message}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* image Section */}
            {!biodata && (
              <div>
                <motion.div
                  variants={itemVariants}
                  className="mb-6 rounded-lg p-4"
                >
                  <h3 className="text-warning mb-3 flex items-center text-lg font-semibold">
                    <FiImage className="mr-2" /> Image
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
                        </div>
                      </label>
                    </div>
                  </div>
                  <p className="mt-2 text-xs">
                    Upload Carefully. You can't update the image in future.
                  </p>
                </motion.div>
              </div>
            )}

            {/* lifestyle Section */}
            <motion.div variants={itemVariants} className="mb-6 rounded-lg p-4">
              <h3 className="text-success mb-3 flex items-center text-lg font-semibold">
                <FiWind className="mr-2" /> Lifestyle
              </h3>

              <div className="space-y-4">
                {/* occupation input */}
                <div>
                  <label htmlFor="occupation">Occupation *</label>
                  <input
                    id="occupation"
                    type="name"
                    {...register("occupation", {
                      required: "Occupation Is Required",
                      minLength: {
                        value: 3,
                        message: "Name Must Be At Least 3 Characters",
                      },
                    })}
                    className={`border px-4 py-2 ${
                      errors.occupation && "border-error focus:ring-error"
                    } `}
                    placeholder="e.g. Engineer"
                  />
                  {errors.occupation && (
                    <p className="error-massage">{errors.occupation.message}</p>
                  )}
                </div>

                {/* religion input */}
                <div>
                  <label htmlFor="religion">Religion</label>
                  <select
                    id="religion"
                    {...register("religion")}
                    className={`border px-4 py-2 ${
                      errors.religion && "border-error focus:ring-error"
                    } `}
                  >
                    <option value="">Select Religion</option>
                    <option value="Islam">Islam</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Christian">Christian</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.religion && (
                    <p className="error-massage">{errors.religion.message}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="rounded-lg p-4">
                <h3 className="text-warning mb-3 flex items-center text-lg font-semibold">
                  <FiPhone className="mr-2" /> Contact Info
                </h3>
                <div className="space-y-4">
                  {/* contact input */}
                  <div>
                    <label htmlFor="mobileNumber">Mobile Number *</label>
                    <input
                      type="number"
                      id="mobileNumber"
                      {...register("mobileNumber", {
                        required: "Mobile Number Is Required",
                        maxLength: 11,
                      })}
                      className={`border px-4 py-2 ${
                        errors.mobileNumber && "border-error focus:ring-error"
                      } `}
                      placeholder="e.g. 012345678901"
                    />
                    {errors.mobileNumber && (
                      <p className="error-massage">
                        {errors.mobileNumber.message}
                      </p>
                    )}
                  </div>

                  {/* email input */}
                  <div>
                    <label htmlFor="contactEmail">
                      Email Address (Read Only)
                    </label>
                    <fieldset disabled>
                      <input
                        type="email"
                        id="contactEmail"
                        value={user?.email}
                        readOnly
                        {...register("contactEmail")}
                        className={`border px-4 py-2 ${
                          errors.contactEmail && "border-error focus:ring-error"
                        } `}
                      />
                    </fieldset>
                    {errors.contactEmail && (
                      <p className="error-massage">
                        {errors.contactEmail.message}
                      </p>
                    )}
                    <p className="mt-2 text-xs">
                      Logged in email. You can't change the email.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* expectation section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="rounded-lg p-4">
                <h3 className="text-error mb-3 flex items-center text-lg font-semibold">
                  <FiList className="mr-2" /> Expectation
                </h3>

                <div className="space-y-4">
                  {/* expected age input */}
                  <div>
                    <label htmlFor="expectedPartnerAge">
                      Expected Partner's Age
                    </label>
                    <input
                      type="number"
                      id="expectedPartnerAge"
                      {...register("expectedPartnerAge")}
                      className={`border px-4 py-2 ${
                        errors.expectedPartnerAge &&
                        "border-error focus:ring-error"
                      } `}
                      placeholder="e.g. 21"
                    />
                    {errors.expectedPartnerAge && (
                      <p className="error-massage">
                        {errors.expectedPartnerAge.message}
                      </p>
                    )}
                  </div>

                  {/* expected height input */}
                  <div>
                    <label htmlFor="expectedPartnerHeight">
                      Expected Partner's Height(cm) *
                    </label>
                    <input
                      type="number"
                      id="expectedPartnerHeight"
                      {...register("expectedPartnerHeight", {
                        required: "Expected Partner's Height Is Required",
                        min: {
                          value: 1,
                          message: "Height Must Be Greater Than 0",
                        },
                      })}
                      className={`border px-4 py-2 ${
                        errors.expectedPartnerHeight &&
                        "border-error focus:ring-error"
                      } `}
                      placeholder="e.g. 150"
                    />
                    {errors.expectedPartnerHeight && (
                      <p className="error-massage">
                        {errors.expectedPartnerHeight.message}
                      </p>
                    )}
                  </div>

                  {/* expected weight input */}
                  <div>
                    <label htmlFor="expectedPartnerWeight">
                      Expected Partner's Weight(kg) *
                    </label>
                    <input
                      type="number"
                      id="expectedPartnerWeight"
                      {...register("expectedPartnerWeight", {
                        required: "Expected Partner's Weight Is Required",
                        min: {
                          value: 1,
                          message: "Weight Must Be Greater Than 0",
                        },
                      })}
                      className={`border px-4 py-2 ${
                        errors.expectedPartnerWeight &&
                        "border-error focus:ring-error"
                      } `}
                      placeholder="e.g. 50"
                    />
                    {errors.expectedPartnerWeight && (
                      <p className="error-massage">
                        {errors.expectedPartnerWeight.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Description section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="rounded-lg p-4">
              <h3 className="text-accent-hover mb-3 flex items-center text-lg font-semibold">
                <FiFileText className="mr-2" /> Description
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
              {biodata ? "Update" : "Save & Publish"}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default EditBiodata;

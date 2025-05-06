import  { useState } from "react";
import { Link, useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  // *Context States
  const { signIn, signInWithGoogle, loading } = useAuth();

  // *Data States
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // *Hook Form States
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // *Handle Form Submission For Email/Password Login
  const onSubmit = async (data) => {
    setError("");
    try {
      await signIn(data.email, data.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // *Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
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
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="section-layout flex-centric min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <title>Login | Pathway</title>
      <motion.div className="card w-full max-w-md" variants={itemVariants}>
        <div className="p-8">
          <motion.h2 className="mb-6 text-center" variants={itemVariants}>
            Welcome Back
          </motion.h2>

          {/* Display Error Message If Login Fails */}
          {error && (
            <motion.div
              className="error-massage mb-4 rounded-lg bg-red-100 p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label htmlFor="email">Email Address</label>
              <div className="relative">
                {/* Email Input With Validation */}
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`border px-4 py-2 pr-3 pl-10 ${
                    errors.email && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. john@example.com"
                />
              </div>
              {/* Display Email Validation Error */}
              {errors.email && (
                <p className="error-massage">{errors.email.message}</p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label htmlFor="password">Password</label>
              <div className="relative">
                {/* Password Input With Toggle Visibility */}
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`border px-4 py-2 pr-10 pl-10 ${
                    errors.password && "border-error focus:ring-error"
                  } `}
                  placeholder="••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {/* Display Password Validation Error */}
              {errors.password && (
                <p className="error-massage">{errors.password.message}</p>
              )}
            </motion.div>

            {/* Forgot Password Link */}
            <motion.div className="text-right" variants={itemVariants}>
              <Link className="text-primary hover:text-primary-hover text-sm hover:underline">
                Forgot Password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-centric w-full gap-2"
              >
                {/* Show Spinner When Loading */}
                {loading ? (
                  <svg
                    className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div
            className="my-6 flex items-center"
            variants={itemVariants}
          >
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 flex-shrink text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </motion.div>

          {/* Google Sign-In Button */}
          <motion.div variants={itemVariants}>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition duration-200 hover:bg-gray-50"
            >
              <FcGoogle className="mr-2 text-xl" />
              Continue With Google
            </button>
          </motion.div>

          {/* Registration Link */}
          <motion.div
            className="mt-6 text-center text-sm"
            variants={itemVariants}
          >
            Don't Have An Account?&nbsp;
            <Link
              to="/register"
              className="text-primary hover:text-primary-hover font-medium hover:underline"
            >
              Create One
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;

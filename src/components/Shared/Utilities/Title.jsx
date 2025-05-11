import { Link } from "react-router"; // eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";

const Title = () => {
  return (
    <div>
      {/* Link To The Homepage */}
      <Link to="/" className="flex-centric gap-1">
        {/* Logo */}
        <motion.img
          animate={{
            rotate: 360,
            transition: {
              duration: 0.6,
              delay: 5,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            },
          }}
          className="w-8"
          src={logo}
          alt="Pathway logo"
        />
        {/* Website Title */}
        <h1 className="title-style">Pathway</h1>
        {/* Trademark Symbol */}
        {/* <h2>
          <sup>&trade;</sup>
        </h2> */}
      </Link>
    </div>
  );
};

export default Title;

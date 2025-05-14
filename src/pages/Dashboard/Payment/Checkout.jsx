import { useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";
import CheckoutForm from "./CheckoutForm";
import useAuth from "../../../hooks/useAuth";
import { FiHash, FiMail, FiUser } from "react-icons/fi";

const Checkout = () => {
  const { id } = useParams();
  const { dbUser } = useAuth();
  const biodataID = Number(id);

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  return (
    <div>
      <title>Checkout | Pathway</title>
      <PageHeading
        heading={"Checkout"}
        text={"Fill the necessary information for a successful payment"}
      />

      {/* Checkout form*/}

      <div className="card lg:w-fit">
        {/* User credentials */}
        <form className="flex flex-col gap-5 lg:flex-row">
          <div className="relative">
            <label htmlFor="email">User Email (Read-only)*</label>
            <div className="pointer-events-none absolute inset-y-0 top-5 left-0 flex items-center pl-3">
              <FiUser className="text-xl text-gray-400" />
            </div>
            <input type="text" value={dbUser?.email} disabled />
          </div>
          <div className="relative">
            <label htmlFor="biodataId">Requested Biodata ID (Read-only)*</label>
            <div className="pointer-events-none absolute inset-y-0 top-4 left-0 flex items-center pl-3">
              <FiHash className="text-xl text-gray-400" />
            </div>
            <input type="number" value={biodataID} disabled />
          </div>
        </form>

        {/* Card input */}
        <div className="mt-4 mb-1 block text-sm font-medium">
          Input Card Details *
        </div>
        <Elements stripe={stripePromise}>
          {/* Form component */}
          <CheckoutForm biodataID={biodataID} />
        </Elements>
      </div>
    </div>
  );
};
export default Checkout;

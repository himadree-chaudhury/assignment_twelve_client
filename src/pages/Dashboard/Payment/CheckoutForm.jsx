import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import "./CheckoutForm.css";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = ({ biodataID }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { dbUser } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const getPaymentIntent = async () => {
      try {
        const { data } = await axiosSecure.post("/create-payment-intent", {
          requestedContactBiodataID: biodataID,
        });
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    getPaymentIntent();
  }, [biodataID, axiosSecure]);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setProcessing(false);
      return console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    // *Confirm payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: dbUser?.displayName,
          email: dbUser?.email,
        },
      },
    });

    if (paymentIntent.status === "succeeded") {
      try {
        // Save data in db
        await axiosSecure.post(`/contact-request/${biodataID}`, {
          transactionId: paymentIntent?.id,
        });
        toast.success("Payment Successful!");
      } catch (error) {
        toast.error(error);
      } finally {
        setProcessing(false);
        navigate("/dashboard/contact-request");
        toast.success("Contact Request Successfully Placed!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="mt-2 flex justify-start gap-2">
        <button
          disabled={!stripe || !clientSecret || processing}
          className="btn-accent"
        >
          Pay $5
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;

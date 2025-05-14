import { useParams } from "react-router";
import PageHeading from "../../../components/Shared/Utilities/PageHeading";

const Checkout = () => {
  const { id } = useParams();
  const biodataID = Number(id);

    
  return (
    <div>
      <title>Checkout | Pathway</title>
      <PageHeading
        heading={"Checkout"}
        text={"Fill the necessary information for a successful payment"}
      />
      <h1>{biodataID}</h1>
    </div>
  );
};
export default Checkout;

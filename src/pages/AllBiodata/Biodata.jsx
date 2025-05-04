import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/Shared/Utilities/LoadingSpinner";
import BiodataDetails from "../BiodataDetails/BiodataDetails";

const Biodata = () => {
  const axiosPublic = useAxiosPublic();

  const { data: biodata, isLoading } = useQuery({
    queryKey: ["biodata"],
    queryFn: async () => {
      const { data } = await axiosPublic("/biodata");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="section-layout">
      <title>Biodata | Pathway</title>
      <div>
        <div>
          <div>
            <h2 className="text-left">Available Biodata</h2>
            <p>Choose Your Perfect Partner</p>
          </div>
        </div>
        {biodata.map((bio) => (
          <BiodataDetails key={bio._id} />
        ))}
      </div>
    </div>
  );
};

export default Biodata;

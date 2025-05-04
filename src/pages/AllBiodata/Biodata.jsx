import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/Shared/Utilities/LoadingSpinner";
import PageHeading from "../../components/Shared/Utilities/PageHeading";
import BioDataCard from "../../components/Shared/Card/BioDataCard";

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
        <PageHeading
          heading={"Available Biodata"}
          text={"Choose Your Perfect Partner"}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {biodata.map((bio) => (
            <div key={bio._id}>
              <BioDataCard bio={bio} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Biodata;

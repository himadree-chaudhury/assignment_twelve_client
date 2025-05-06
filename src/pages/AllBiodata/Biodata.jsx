import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PageHeading from "../../components/Shared/Utilities/PageHeading";
import BioDataCard from "../../components/Shared/Card/BioDataCard";
import BioSkelton from "../../components/Shared/Card/Skelton/BioSkelton";

const Biodata = () => {
  const axiosPublic = useAxiosPublic();

  const { data: biodata, isLoading } = useQuery({
    queryKey: ["biodata"],
    queryFn: async () => {
      const { data } = await axiosPublic("/biodata");
      return data;
    },
  });

if (isLoading) {
  return (
    <div className="section-layout">
      <div>
        <PageHeading
          heading={"Available Biodata"}
          text={"Choose Your Perfect Partner"}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <BioSkelton key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}
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

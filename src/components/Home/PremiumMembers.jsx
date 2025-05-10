import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import BioDataCard from "../Shared/Card/BioDataCard";
import BioSkelton from "../Shared/Card/Skelton/BioSkelton";
import Dropdown from "../Form/Dropdown";

const PremiumMembers = () => {
  const axiosPublic = useAxiosPublic();
  const [sortOption, setSortOption] = useState("younger");

  const { data: premium = [], isLoading } = useQuery({
    queryKey: ["premium", sortOption],
    queryFn: async () => {
      const { data } = await axiosPublic(`/premium?sort=${sortOption}`);
      return data;
    },
  });

  return (
    <div className="section-layout flex flex-col gap-5">
      <div className="flex justify-end">
        <Dropdown
          sortOptions={[
            { value: "younger", label: "Younger First" },
            { value: "older", label: "Older First" },
          ]}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <BioSkelton key={index} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {premium.map((bio) => (
            <div key={bio._id}>
              <BioDataCard bio={bio} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default PremiumMembers;

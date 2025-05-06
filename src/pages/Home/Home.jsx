import { useQuery } from "@tanstack/react-query";
import Banner from "../../components/Home/Banner";
import Heading from "../../components/Shared/Utilities/Heading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import BioSkelton from "../../components/Shared/Card/Skelton/BioSkelton";
import BioDataCard from "../../components/Shared/Card/BioDataCard";
import Dropdown from "../../components/Form/Dropdown";
import { useState } from "react";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [sortOption, setSortOption] = useState("younger");
  
  console.log(sortOption);
  const { data: premium, isLoading } = useQuery({
    queryKey: ["premium", sortOption],
    queryFn: async () => {
      const { data } = await axiosPublic(`/premium?sort=${sortOption}`);
      return data;
    },
  });

  return (
    <div>
      {/* Header section */}
      <header>
        <Banner />
      </header>

      <div className="section-layout">
        {/* Section : premium members */}
        <Heading
          title={"MEMBERS"}
          heading={"Meet Our Premium Members"}
          description={
            "Discover our latest premium members looking for their perfect match. Sort by age and connect with someone special today"
          }
        />
        {/* members card */}
        <div className="section-layout flex flex-col items-end gap-5">
          <Dropdown
            sortOptions={[
              { value: "younger", label: "Younger First" },
              { value: "older", label: "Older First" },
            ]}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
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
        {/* <div>{premium.length}</div> */}
        {/* Section : work flow */}
        <Heading
          title={"HOW IT WORKS"}
          heading={"Your Journey to Love in 3 Simple Steps"}
          description={
            "Pathway makes finding your life partner easy. Create your biodata, explore matches, and connect with your perfect partner - all in just a few clicks"
          }
        />
        {/* Section : success counter */}
        <Heading
          title={"SUCCESS COUNTER"}
          heading={"Our Love Milestones"}
          description={
            "Celebrate with us! See how many couples have found love through Pathway, with new stories added every day"
          }
        />
        {/* Section : success stories */}
        <Heading
          title={"STORIES"}
          heading={"Real Love Stories from Pathway"}
          description={
            "Be inspired by couples who found their forever through Pathway. Explore their journeys, sorted by marriage date, and start writing your own story"
          }
        />
      </div>
    </div>
  );
};

export default Home;

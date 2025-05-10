import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import StoryCard from "../Shared/Card/StoryCard";
import StorySkeleton from "../Shared/Card/Skelton/StorySkeleton";
import Dropdown from "../Form/Dropdown";

const SuccessStory = () => {
  const axiosPublic = useAxiosPublic();
  const [sortOption, setSortOption] = useState("newest");

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["stories", sortOption],
    queryFn: async () => {
      const { data } = await axiosPublic(`/success-stories?sort=${sortOption}`);
      return data;
    },
  });

  return (
    <div className="section-layout flex flex-col gap-5">
      <div className="flex justify-end">
        <Dropdown
          sortOptions={[
            { value: "newest", label: "Newest First" },
            { value: "oldest", label: "Oldest First" },
          ]}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <StorySkeleton key={index} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SuccessStory;

import { useQuery } from "@tanstack/react-query";
import CountUp from "../Animation/Counter/CountUp";
import GradientText from "../Animation/Text/GradientText";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../Shared/Utilities/LoadingSpinner";

const SuccessCounter = () => {
  const axiosPublic = useAxiosPublic();

  // *Get stats
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["stat"],
    queryFn: async () => {
      const { data } = await axiosPublic("/milestone");
      return {
        totalBiodata: data.totalBiodata || 0,
        totalGirls: data.totalGirls || 0,
        totalBoys: data.totalBoys || 0,
        totalMarriage: data.totalMarriage || 0,
      };
    },
  });

  if (isLoading) return <LoadingSpinner/>;

  const { totalBiodata, totalGirls, totalBoys, totalMarriage } =
    statsData || {};
  
  // *Card stats
  const stats = [
    { label: "Total Biodata", value: totalBiodata },
    { label: "Girl's Biodata", value: totalGirls },
    { label: "Boy's Biodata", value: totalBoys },
    {
      label: "Successful Marriage",
      value: totalMarriage,
    },
  ];

  return (
    <div className="section-layout grid grid-cols-1 gap-8 sm:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={stat.label} className="card text-center">
          <GradientText>
            <CountUp
              key={index}
              from={0}
              to={stat.value}
              separator=","
              direction="up"
              duration={1}
              className="mb-2 text-5xl font-semibold"
            />
          </GradientText>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SuccessCounter;

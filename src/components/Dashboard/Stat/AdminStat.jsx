import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/Utilities/LoadingSpinner";
import GradientText from "../../Animation/Text/GradientText";
import CountUp from "../../Animation/Counter/CountUp";

const AdminStat = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch admin stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure("/admin-stat");
      return data;
    },
  });

  // Stats data
  const statsInfo = [
    { label: "Total Biodata", value: stats?.biodataCount || 0 },
    { label: "Total Male's Biodata", value: stats?.maleBiodataCount || 0 },
    { label: "Total Female's Biodata", value: stats?.femaleBiodataCount || 0 },
    {
      label: "Total Premium Biodata",
      value: stats?.premiumBiodataCount || 0,
    },
    {
      label: "Total Revenue",
      value: stats?.totalRevenue || 0,
    },
    {
      label: "Total User",
      value: stats?.totalUser || 0,
    },
  ];

  // Colors for the pie chart segments
  const COLORS = [
    "oklch(45.7% 0.24 277.023)",
    "oklch(51.8% 0.253 323.949)",
    "oklch(70.4% 0.14 182.503)",
    "oklch(59.2% 0.249 0.584)",
    "oklch(71.5% 0.143 215.221)",
    "oklch(66.6% 0.179 58.318)",
  ];

  // Custom label renderer
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: "15px", fontWeight: "bold" }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="section-layout space-y-8">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:grid-cols-6">
          {statsInfo.map((stat, index) => (
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
              <p className="font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pie Chart Section */}
      <div className="card p-6">
        <h3>Biodata Distribution</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statsInfo}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                innerRadius={40}
                dataKey="value"
                animationDuration={1000}
                animationEasing="ease-out"
                paddingAngle={2}
              >
                {statsInfo.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [value, props.payload.label]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value, entry, index) => statsInfo[index].label}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminStat;

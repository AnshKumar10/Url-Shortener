import { UrlClicksDbInterface } from "@/lib/interfaces";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LocationStatsProps {
  stats: UrlClicksDbInterface[];
}

export const LocationStats: React.FC<LocationStatsProps> = ({ stats = [] }) => {
  const cityCount = stats.reduce((acc, item) => {
    if (acc[item.city]) {
      acc[item.city] += 1;
    } else {
      acc[item.city] = 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart width={700} height={300} data={cities.slice(0, 5)}>
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip labelStyle={{ color: "green" }} />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LocationStats;

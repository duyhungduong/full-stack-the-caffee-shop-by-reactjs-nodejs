import { FiMoreVertical } from "react-icons/fi";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { Tooltip } from "@mui/material";

function PieChartt({ dataPieChart }) {
  return (
    <div className="flex-1 rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">Thống kê</h3>
        <FiMoreVertical />
      </div>
      <div className="flex flex-col justify-between w-[350px]">
        <div className="flex items-center justify-center w-full h-full">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
              />
              <Pie
                data={dataPieChart}
                innerRadius="70%"
                outerRadius="90%"
                paddingAngle={5}
                dataKey="value"
                stroke="#fff" // Đường viền trắng
                strokeWidth={2} // Độ dày của đường viền
              >
                {dataPieChart.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between gap-2 text-sm">
          {dataPieChart.map((item) => (
            <div className="flex items-center justify-normal mx-2" key={item.name}>
              <div className="flex gap-2 items-center">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                
                <span>{item.name}</span>
                
              </div>
              <span className="pl-2">{item.value.toLocaleString()}</span>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PieChartt;

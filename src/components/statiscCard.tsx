import { Tooltip } from "antd";
import { Bar, BarChart, CartesianGrid } from "recharts";
import BaruunDeesheSum from "../assets/componentsSvg/adminsvg/baruunDeesheSum";

export default function StatiscCard({ data }: any) {
  return (
    <div className="w-[355px] h-[182px] bg-black/10 rounded-[18px] px-[20px] pt-[10px] pb-[20px] flex flex-col">
      <div className="flex items-center justify-between">
        <div className="text-white/90 font-[400]">Ирцийн статик</div>
        <select className="rounded-[10px] bg-white/10 text-white/70 text-[12px] h-[30px] px-[10px]">
          <option value="7honog">7 хоног</option>
        </select>
      </div>
      <div className="border-b-[1px] border-white/30 h-[125px] w-full flex items-start relative">
        <div className="text-[46px] font-[500] text-white/90 leading-[46px] min-w-[100px]">
          87%
        </div>
        <div className="flex gap-[3px] relative h-full w-[255px]">
          <BaruunDeesheSum width="10px" height="10px" color="#80ffb7" />
          <div className="text-[8px] leading-[10px] text-white/50">+13.8%</div>

          {/* Hover Area */}
          <div className="absolute top-0 right-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white p-4 rounded-lg">
            <div className="text-[12px]">
              <p>
                <strong>X:</strong> 1200
              </p>
              <p>
                <strong>Y:</strong> 2400
              </p>
              <p>
                <strong>Date:</strong> 2025-04-01
              </p>
            </div>
          </div>

          <div className="absolute text-white/90 bottom-0 left-0">
            <BarChart width={220} height={100} data={data}>
              <Tooltip />
              <CartesianGrid strokeDasharray="5 5" />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}

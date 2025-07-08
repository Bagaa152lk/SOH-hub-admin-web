import { useNavigate } from "react-router-dom";

import SelectHothonTableList from "../../components/SelectHothonTableList";
import { useQuery } from "@apollo/client";
import { GET_PROPERTIES } from "../../graphql/queries";
import SearchIcon from "../../assets/componentsSvg/adminsvg/searchIcon";
import PlusIcon from "../../assets/componentsSvg/adminsvg/plusIcon";
import FireIcon from "../../assets/componentsSvg/adminsvg/fireIcon";
import WarningMessengerIcon from "../../assets/componentsSvg/adminsvg/warningMessengerIcon";

function SelectHothonTable() {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PROPERTIES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <div>Уншиж байна...</div>;
  if (error) return <div>Алдаа гарлаа: {error.message}</div>;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <header className="w-[74%] flex flex-wrap gap-[8px] md:gap-[0px] items-center justify-between border-b-[1px] border-b-white/15 pb-[20px] mt-[180px]">
        <div className="relative w-full sm:w-[272px] flex items-center">
          <input
            type="text"
            className="h-[50px] pl-[45px] pr-[20px] bg-white/5 w-full rounded-[16px] text-white focus:ring-2 focus:ring-[#80FFB766] outline-none hover:scale-95 duration-150"
            placeholder="СӨХ хайх"
          />
          <div className="absolute  left-[15px] top-[15px] ">
            <SearchIcon />
          </div>
        </div>
        <button
          className="flex items-center justify-between h-[50px] w-full sm:w-[172px] rounded-[16px] bg-[#80FFB766] backdrop-opacity-40 px-[20px] text-white/90 hover:scale-105 duration-150 hover:ring-1 hover:ring-[#80FFB7]"
          onClick={() => navigate("/create-new-hothon")}
        >
          СӨХ нэмэх <PlusIcon opacity="1" color="#80FFB7" />
        </button>
      </header>

      <main className="mt-[20px] w-[74%] grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-[20px]">
        {data.getProperties.map((property: any) => (
          <SelectHothonTableList
            key={property._id}
            data={{
              id: property._id,
              hothonName: property.name,
              hothonImage_url: "/image/hothonizurag.png",
              zorchilData: [
                {
                  id: "1",
                  zorchilType: "Гадны хүн",
                  icon: <FireIcon width="12px" height="12px" />,
                  zorchilCount: Math.floor(Math.random() * 10),
                },
                {
                  id: "2",
                  zorchilType: "Сэрэмжлүүлэг",
                  icon: <WarningMessengerIcon width="12px" height="12px" />,
                  zorchilCount: Math.floor(Math.random() * 5),
                },
              ],
              hothonMember: [
                {
                  id: "1",
                  img_url: "/image/profile1.png",
                  isOnline: true,
                },
                {
                  id: "2",
                  img_url: "/image/profile2.png",
                  isOnline: false,
                },
              ],
            }}
            onClick={() => navigate(`/dashboard`)}
          />
        ))}
      </main>
    </div>
  );
}

export default SelectHothonTable;

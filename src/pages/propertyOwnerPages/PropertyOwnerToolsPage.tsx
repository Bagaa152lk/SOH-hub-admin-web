import { useState } from "react";
import ToirogshigIcon from "../../assets/componentsSvg/navigationIcons/ToirogshigIcon";
import SearchIconNav from "../../assets/componentsSvg/navigationIcons/SearchIconNav";
import DailyReportHeader from "../../components/layouts/DailyReportHeader";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_THING } from "../../graphql/mutations";
import { GET_THINGS, ME } from "../../graphql/queries";
import DooshooZaasanSum from "../../assets/componentsSvg/adminsvg/dooshooZaasanSum";
import ToolIcon from "../../assets/componentsSvg/toolIcon";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border bg-white/10 border-green-100 rounded-lg px-3 py-2"
      />
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border bg-white/10 border-green-100 rounded-lg px-3 py-2"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

type TextAreaFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function TextAreaField({ label, name, value, onChange }: TextAreaFieldProps) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border bg-white/10 border-green-100 rounded-lg px-3 py-2"
      />
    </div>
  );
}

type ImageUploadProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string | null;
  onRemove: () => void;
};

function ImageUpload({ onChange, previewUrl, onRemove }: ImageUploadProps) {
  return (
    <div>
      <label className="block mb-1 font-medium">Зураг</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={onChange}
        className="w-full bg-black/10"
      />
      {previewUrl && (
        <div className="mt-3 relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full max-h-64 rounded-xl border"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 rounded-lg text-xs hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default function PropertyOwnerToolsPage() {
  const { data: thingsData } = useQuery(GET_THINGS);
  const [formData, setFormData] = useState({
    name: "",
    type: "SuperAdmin",
    description: "",
    status: "Normal",
    image: null as File | null,
  });
  const thingsDatas = thingsData?.getThings?.filter(
    (item: any) => item.propertyId._id === localStorage.getItem("userId")
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files, desc } = e.target as any;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewUrl(null);
  };

  const [createThing] = useMutation(CREATE_THING);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Mutation дуудаж өгөгдөл илгээх
      await createThing({
        variables: {
          thing: {
            name: formData.name,
            propertyId: localStorage.getItem("userId"),
            whose: formData.type,
            history: {
              desc: formData.description,
              thingPic: formData.image,
              status: "normal",
            },
          },
        },
      });

      alert("Амжилттай хадгаллаа!");
    } catch (error) {
      console.error("Хадгалахад алдаа гарлаа:", error);
      alert("Алдаа гарлаа!");
    }
  };

  return (
    <div className="w-full grid grid-cols-10 gap-[20px] px-4">
      <div className="col-span-8">
        <div className="w-full h-full bg-black/10  rounded-[17px] overflow-hidden">
          <div className="bg-black/10 h-[56px] pl-[18px] pr-[6px]  flex items-center justify-between ">
            <div className="flex items-center gap-[8px] ">
              <ToolIcon />
              <div className="text-white/90">Хэрэгсэлийн тайлан</div>
              <div className="w-[35px] h-[24px] bg-white/10 text-white/30 flex justify-center items-center rounded-[55px]">
                {thingsDatas && thingsDatas.length}
              </div>
            </div>
            <div className="relative h-[44px] w-[272px] rounded-tl-[14px] rounded-bl-[14px] rounded-tr-[16px] rounded-br-[14px] bg-white/10">
              <div className="absolute top-[50%] -translate-y-1/2 left-[20px]">
                <SearchIconNav width="20px" height="20px" color="#80FFB7" />
              </div>
              <input
                type="text"
                placeholder="Хайлт хийх"
                className="absolute border-0 bg-transparent top-[50%] -translate-y-1/2 pl-[73px] text-white/90 w-full h-full rounded-tl-[14px] rounded-bl-[14px] rounded-tr-[16px] rounded-br-[14px]  focus:outline-none focus:ring-2 focus:ring-[#80FFB7]"
              />
            </div>
          </div>
          <div className="p-[20px] flex flex-col gap-[10px]">
            {/* HEADER */}
            <div className="h-[44px] px-[30px] grid grid-cols-6 items-center rounded-[14px] bg-black/10 text-[10px] text-white/50 whitespace-nowrap">
              <div className="flex gap-[5px] items-center">
                НЭР
                <DooshooZaasanSum />
              </div>
              <div className="flex gap-[5px] items-center">
                ОГНОО
                <DooshooZaasanSum />
              </div>
              <div className="flex gap-[5px] items-center">
                ТАЙЛБАР
                <DooshooZaasanSum />
              </div>
              <div className="flex gap-[5px] items-center uppercase">
                Ашиглагдсан МЭДЭГДЭЛ
                <DooshooZaasanSum />
              </div>
              <div className="flex gap-[5px] items-center">
                ТӨЛӨВ
                <DooshooZaasanSum />
              </div>
              <div className="flex gap-[5px] items-center">
                ХЭНИЙ ӨМЧ ВЭ
                <DooshooZaasanSum />
              </div>
            </div>

            {/* ROWS */}
            {thingsDatas &&
              thingsDatas.map((item: any, i: number) => (
                <div
                  key={i}
                  className="h-[58px] rounded-[16px] text-white/80 bg-white/10 grid grid-cols-6 items-center px-[30px] text-[12px]"
                >
                  <div className="flex items-center gap-[10px]">
                    <img
                      src={item.history[0]?.thingPic}
                      className="w-8 h-8 rounded-lg object-cover"
                      alt=""
                    />
                    <span className="w-[100px] truncate">{item.name}</span>
                  </div>
                  <span>
                    {
                      new Date(parseInt(item.updatedAt))
                        .toISOString()
                        .split("T")[0]
                    }
                    -
                    {
                      new Date(parseInt(item.updatedAt))
                        .toISOString()
                        .split("T")[1]
                        .split(".")[0]
                    }
                  </span>
                  <span className="truncate w-[200px]">
                    {item.history[0]?.desc}
                  </span>
                  <span>{item.history.length - 1}</span>
                  <span>
                    {item.history[item.history.length - 1]?.status === "normal"
                      ? "Хэвийн"
                      : ""}
                    {item.history[item.history.length - 1]?.status === "broken"
                      ? "Эвдэрсэн"
                      : ""}
                    {item.history[item.history.length - 1]?.status === "lost"
                      ? "Алга болсон"
                      : ""}
                  </span>
                  <span>
                    {item.whose && item.whose === "SuperAdmin"
                      ? "Админий өмч"
                      : "СӨХ ийн өмч"}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="max-w-xl mx-auto  p-4 bg-black/10 rounded-2xl shadow-md text-white/80">
          <h2 className="text-2xl font-semibold mb-4">Хэрэгсэл нэмэх</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Хэрэгсэлийн нэр"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <SelectField
              label="Хэнийх вэ ?"
              name="type"
              value={formData.type}
              options={["SuperAdmin", "PropertyOwner"]}
              onChange={handleChange}
            />

            <TextAreaField
              label="Тайлбар (Жишээ нь : Ногоон өнгийн хажуудаа сэтэрхийтээ)"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            {/* <SelectField
              label="Status"
              name="status"
              value={formData.status}
              options={["Normal", "Lost", "Broken"]}
              onChange={handleChange}
            /> */}

            <ImageUpload
              onChange={handleChange}
              previewUrl={previewUrl}
              onRemove={handleRemoveImage}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Хадгалах
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

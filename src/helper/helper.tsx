import {
  Flame,
  CloudFog,
  Phone,
  PhoneCall,
  Cigarette,
  HardHat,
  Shirt,
  BadgeAlert,
  AlertCircle,
  Bike,
  Car,
  Truck,
  Users,
  PersonStanding,
  User,
  Ban,
  CircleSlash,
  ChevronUp,
  Eye,
  Moon,
  Activity,
  HelpCircle,
  Zap,
  Wand2,
  DoorOpen,
  ChevronRight,
} from "lucide-react";

export const getIconAndLabelForAlarm = (alarmStr: string) => {
  switch (alarmStr) {
    case "Snap":
      return { icon: <Zap className="text-yellow-400" />, label: "Товчлуур" };
    case "Safecap":
      return {
        icon: <HardHat className="text-orange-400" />,
        label: "Аюулгүйн малгай",
      };
    case "Mask":
      return { icon: <User className="text-gray-300" />, label: "Маск" };
    case "Work clothes":
      return {
        icon: <Shirt className="text-blue-500" />,
        label: "Ажлын хувцас",
      };
    case "Safe belt":
      return {
        icon: <BadgeAlert className="text-yellow-500" />,
        label: "Аюулгүйн бүс",
      };
    case "Reflective clothing":
      return {
        icon: <Shirt className="text-green-400" />,
        label: "Гэрэл ойлгогчтой хувцас",
      };
    case "Flame":
      return { icon: <Flame className="text-red-500" />, label: "Гал" };
    case "Smog":
      return { icon: <CloudFog className="text-gray-400" />, label: "Утаа" };
    case "Fire fighting facilities":
      return {
        icon: <Wand2 className="text-red-400" />,
        label: "Галын аюулгүй байдлын хэрэгсэл",
      };
    case "Mess stacking":
      return {
        icon: <AlertCircle className="text-pink-500" />,
        label: "Эмх замбараагүй өрөлт",
      };
    case "No parking":
      return {
        icon: <CircleSlash className="text-red-600" />,
        label: "Зогсоол хориглосон",
      };
    case "Vehicle left":
      return {
        icon: <Car className="text-gray-500" />,
        label: "Орхигдсон тээврийн хэрэгсэл",
      };
    case "Wander":
      return {
        icon: <PersonStanding className="text-blue-300" />,
        label: "Тэнэсэн",
      };
    case "Over Wall":
      return {
        icon: <ChevronRight className="text-yellow-300" />,
        label: "Хана давсан",
      };
    case "Intrusion":
      return {
        icon: <BadgeAlert className="text-red-600" />,
        label: "Халдлага",
      };
    case "Tripwire":
      return { icon: <Zap className="text-pink-500" />, label: "Ослын утас" };
    case "Exit":
      return { icon: <DoorOpen className="text-green-500" />, label: "Гарах" };
    case "Fall":
      return { icon: <Moon className="text-purple-400" />, label: "Уналт" };
    case "Smoking":
      return {
        icon: <Cigarette className="text-gray-400" />,
        label: "Тамхи татах",
      };
    case "Call":
      return { icon: <Phone className="text-blue-500" />, label: "Утасдах" };
    case "Watch phone":
      return { icon: <Eye className="text-blue-400" />, label: "Утсаа харах" };
    case "Run":
      return { icon: <Activity className="text-green-400" />, label: "Гүйх" };
    case "Sleep on duty":
      return {
        icon: <Moon className="text-indigo-300" />,
        label: "Ажил дээрээ унтах",
      };
    case "Off duty":
      return { icon: <Ban className="text-red-400" />, label: "Ажлаас гадуур" };
    case "Gathering":
      return { icon: <Users className="text-pink-500" />, label: "Цугларах" };
    case "Fight":
      return {
        icon: <AlertCircle className="text-red-700" />,
        label: "Зодоон",
      };
    case "Over staff":
      return {
        icon: <Users className="text-orange-400" />,
        label: "Ажилтнуудын илүүдэл",
      };
    case "Less staff":
      return {
        icon: <Users className="text-yellow-400" />,
        label: "Ажилтнуудын дутагдал",
      };
    case "Cycle forbit":
      return {
        icon: <CircleSlash className="text-red-400" />,
        label: "Дугуй унахыг хориглох",
      };
    case "Cycle left":
      return {
        icon: <Bike className="text-gray-500" />,
        label: "Хаягдсан дугуй",
      };
    case "Riding without cap":
      return {
        icon: <Bike className="text-orange-500" />,
        label: "Малгайгүй дугуй унах",
      };
    case "Vehicle over":
      return {
        icon: <Truck className="text-blue-700" />,
        label: "Их хэмжээний тээврийн хэрэгсэл",
      };
    case "Vehicle less":
      return {
        icon: <Car className="text-blue-400" />,
        label: "Цөөн хэмжээний тээврийн хэрэгсэл",
      };
    case "Special vehicle forbid":
      return {
        icon: <Ban className="text-pink-600" />,
        label: "Тусгай тээврийн хэрэгслийг хориглох",
      };
    case "Drive motorcycle in petrol station":
      return {
        icon: <Bike className="text-red-600" />,
        label: "ШТС-д мотоцикл жолоодох",
      };
    case "Oil trucks operation not right":
      return {
        icon: <Truck className="text-yellow-500" />,
        label: "Газрын тосны машин буруу ажиллаж байна",
      };
    case "Working sign":
      return {
        icon: <BadgeAlert className="text-green-400" />,
        label: "Ажиллах тэмдэг",
      };
    case "Human retention":
      return {
        icon: <PersonStanding className="text-blue-400" />,
        label: "Хүн хадгалах",
      };
    case "Human helpup":
      return {
        icon: <HelpCircle className="text-green-400" />,
        label: "Хүнд туслах",
      };
    default:
      return { icon: <AlertCircle className="text-white" />, label: alarmStr };
  }
};

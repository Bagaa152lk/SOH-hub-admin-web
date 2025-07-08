import { ReactNode } from "react";
export type BackgroundComponent = {
  children?: ReactNode;
};

export type GridAreaCompoentType = {
  position1?: ReactNode;
  position2?: ReactNode;
  position3?: ReactNode;
  position4?: ReactNode;
  position5?: ReactNode;
  position6?: ReactNode;
  position7?: ReactNode;
  position8?: ReactNode;
  position9?: ReactNode;
  positionEmployee?: ReactNode;
  positionCameretable?: ReactNode;
  positionFullCamera?: ReactNode;
};
export type EmployeeData = {
  _id: any;
  id: string;
  key?: string;
  name?: string;
  idNumber?: string;
  phoneNumber?: string;
  phone?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  profilePic?: string;
  assignedObject?: string[];
  employeeStatus?: string;
  dateReceived?: string;
  dateSent?: string;
  disciplinaryStatus?: string;
  img_url?: string;
  gender?: string;
  age?: number;
  status?: string;
  birthday?: string;
};

export type ObjectType = {
  id: string;
  _id?: string;
  key: string;
  object_img_url: string;
  img_url: string;
  hariutssan_ajiltan: string;
  phoneNumber: string;
  assignedObject: string;
  guards: EmployeeData[];
  orgorog: string;
  urtrag: string;
  camera_count: number;
};
// export type EmployeeTablePropsType = {
//   data: {
//     id: string;
//     key?: string;
//     name?: string;
//     idNumber?: string;
//     phoneNumber?: string;
//     assignedObject?: string[];
//     employeeStatus?: string;
//     dateReceived?: string;
//     dateSent?: string;
//     disciplinaryStatus?: string;
//     img_url?: string;
//     gender?: string;
//     age?: number;
//     status?: string;
//   };
// };
export type DailyReportPropsType = {
  src?: string | any;
  status?: string;
  date?: string;
  description?: string;
};

export type EmployeeUuregButtonType = {
  img_url: string;
  name: string;
};
export type IconColorType = {
  color?: string;
  width?: string;
  height?: string;
  opacity?: string;
};

export type Item = {
  id: number;
  value: string;
  bgColor: string;
  icon?: ReactNode;
};
export type DailyReportListPropsDataType = {
  number: number;
  data: {
    id: number;
    date: string;
    sohName: string;
    description: string;
    items: {
      notif: Item;
      zurchil: Item;
      dayStatus: Item;
    };
  };
};

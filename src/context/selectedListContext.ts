import { createContext, useContext } from "react";
import { DailyReportListPropsDataType } from "../type/type";

type SelectedListHandler = (data: DailyReportListPropsDataType) => void;

export const SelectedListContext = createContext<SelectedListHandler>(() => {});

export const useSelectedList = () => useContext(SelectedListContext);

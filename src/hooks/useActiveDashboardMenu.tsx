import { Menu } from "@/components/DashboardMenu";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type StateActiveDashboardMenu = [
  Menu["label"],
  Dispatch<SetStateAction<Menu["label"]>>
];

export function useStateActiveDashboardMenu(
  initialState: Menu["label"] = ""
): StateActiveDashboardMenu {
  return useState<Menu["label"]>(initialState);
}

export const ActiveDashboardMenuContext =
  createContext<StateActiveDashboardMenu>(["Dashboard", () => {}]);

export function useContextActiveDashboardMenu() {
  return useContext<StateActiveDashboardMenu>(ActiveDashboardMenuContext);
}

export function ActiveDashboardMenuContextProvider({
  children,
}: Readonly<{
  children?: ReactNode;
}>) {
  return (
    <ActiveDashboardMenuContext.Provider value={useStateActiveDashboardMenu()}>
      {children}
    </ActiveDashboardMenuContext.Provider>
  );
}

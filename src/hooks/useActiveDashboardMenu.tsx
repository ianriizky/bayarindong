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
  Menu["link"],
  Dispatch<SetStateAction<Menu["link"]>>
];

export function useStateActiveDashboardMenu(
  initialState: Menu["link"] = ""
): StateActiveDashboardMenu {
  return useState<Menu["link"]>(initialState);
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

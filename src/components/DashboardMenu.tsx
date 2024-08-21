import { useContextActiveDashboardMenu } from "@/hooks/useActiveDashboardMenu";
import { type Role } from "@/typebox";
import { Skeleton, UnstyledButton, UnstyledButtonProps } from "@mantine/core";
import {
  Icon,
  IconChartHistogram,
  IconHome,
  IconPig,
  IconProps,
} from "@tabler/icons-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type Menu = {
  link: string;
  label: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  roles: Role.Name[];
};

const menus: Menu[] = [
  {
    link: "/dashboard",
    label: "Dashboard",
    icon: IconHome,
    roles: ["admin", "member"],
  },
  {
    link: "/dashboard/order",
    label: "Transaction History",
    icon: IconChartHistogram,
    roles: ["admin"],
  },
  {
    link: "/dashboard/deposit",
    label: "Deposit & Withdraw",
    icon: IconPig,
    roles: ["admin", "member"],
  },
];

export default function DashboardMenu({
  skeletonNumber,
  roleName,
  unstyledButtonProps,
  iconProps,
}: {
  skeletonNumber?: number;
  roleName?: Role.Name;
  unstyledButtonProps: UnstyledButtonProps;
  iconProps: IconProps;
}) {
  const [activeDashboardMenu, setActiveDashboardMenu] =
    useContextActiveDashboardMenu();

  if (!roleName) {
    return Array(skeletonNumber || 5)
      .fill(0)
      .map((_, index) => (
        <Skeleton key={index} mt="xs">
          <UnstyledButton {...unstyledButtonProps}>
            <span>&nbsp;</span>
          </UnstyledButton>
        </Skeleton>
      ));
  }

  return menus
    .filter((menu) => menu.roles.includes(roleName))
    .map((menu, index) => (
      <UnstyledButton
        component={Link}
        href={menu.link}
        key={index}
        data-active={menu.link === activeDashboardMenu || undefined}
        onClick={() => {
          setActiveDashboardMenu(menu.link);
        }}
        {...unstyledButtonProps}
      >
        <menu.icon stroke={1.5} {...iconProps} />
        <span>{menu.label}</span>
      </UnstyledButton>
    ));
}

"use client";

import {
  AppShell,
  Avatar,
  Burger,
  Group,
  ScrollArea,
  Skeleton,
  Text,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  Icon,
  IconBook,
  IconChartHistogram,
  IconHome,
  IconLogout,
  IconMoon,
  IconPig,
  IconProps,
  IconSun,
} from "@tabler/icons-react";
import cx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import classes from "./page.module.css";

const menus: {
  link: string;
  label: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  roles: ("admin" | "member")[];
}[] = [
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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeMenu, setActiveMenu] = useState<string | undefined>("Dashboard");
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const { data: session } = useSession();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      styles={{
        main: {
          background:
            colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text
            component={Link}
            href="/"
            variant="gradient"
            fz="xl"
            fw="bolder"
          >
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section>
          <UnstyledButton
            component={Link}
            className={classes.link}
            data-active={"Profile" === activeMenu || undefined}
            href="/dashboard/profile"
            onClick={() => {
              setActiveMenu("Profile");
            }}
          >
            <Group>
              <Avatar src={session?.user?.image} radius="xl" />

              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {session?.user?.name}
                </Text>

                <Text c="dimmed" size="xs">
                  {session?.user?.email}
                </Text>
              </div>
            </Group>
          </UnstyledButton>
        </AppShell.Section>

        <AppShell.Section grow my="md" component={ScrollArea}>
          {menus.map((menu, index) =>
            // @ts-ignore
            menu.roles.includes(session?.user?.role) ? (
              <UnstyledButton
                className={classes.link}
                data-active={menu.label === activeMenu || undefined}
                component={Link}
                href={menu.link}
                key={index}
                onClick={() => {
                  setActiveMenu(menu.label);
                }}
              >
                <menu.icon className={classes.linkIcon} stroke={1.5} />
                <span>{menu.label}</span>
              </UnstyledButton>
            ) : (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            )
          )}
        </AppShell.Section>

        <AppShell.Section>
          <UnstyledButton
            className={classes.link}
            component={Link}
            href="/api/doc"
          >
            <IconBook className={classes.linkIcon} stroke={1.5} />
            <span>API Documentation</span>
          </UnstyledButton>
          <UnstyledButton
            component="a"
            className={classes.link}
            onClick={async (event) => {
              setColorScheme(
                computedColorScheme === "light" ? "dark" : "light"
              );
            }}
          >
            <IconSun
              className={cx(classes.linkIcon, classes.light)}
              stroke={1.5}
            />
            <IconMoon
              className={cx(classes.linkIcon, classes.dark)}
              stroke={1.5}
            />
            <span>Change Theme</span>
          </UnstyledButton>
          <UnstyledButton
            component="a"
            className={classes.link}
            onClick={async () => {
              await signOut();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout </span>
          </UnstyledButton>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

"use client";

import DashboardMenu from "@/components/DashboardMenu";
import {
  ActiveDashboardMenuContext,
  useStateActiveDashboardMenu,
} from "@/hooks/useActiveDashboardMenu";
import {
  AppShell,
  Avatar,
  Burger,
  Code,
  Group,
  ScrollArea,
  Text,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { IconBook, IconLogout, IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./page.module.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const { data: session } = useSession();
  const [activeDashboardMenu, setActiveDashboardMenu] =
    useStateActiveDashboardMenu(pathname);

  return (
    <ModalsProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text
              component={Link}
              href="/"
              variant="gradient"
              fz="xl"
              fw="bolder"
            >
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Text>
            <Code fw={700}>{process.env.NEXT_PUBLIC_VERSION}</Code>
          </Group>
        </AppShell.Header>

        <ActiveDashboardMenuContext.Provider
          value={[activeDashboardMenu, setActiveDashboardMenu]}
        >
          <AppShell.Navbar p="md">
            <AppShell.Section>
              <UnstyledButton
                component={Link}
                className={classes.link}
                data-active={
                  "/dashboard/profile" === activeDashboardMenu || undefined
                }
                href="/dashboard/profile"
                onClick={() => {
                  setActiveDashboardMenu("/dashboard/profile");
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
              <DashboardMenu
                roleName={session?.user?.role_name}
                unstyledButtonProps={{
                  className: classes.link,
                }}
                iconProps={{
                  className: classes.linkIcon,
                }}
              />
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
                onClick={(event) => {
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
        </ActiveDashboardMenuContext.Provider>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </ModalsProvider>
  );
}

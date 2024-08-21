"use client";

import { getColorScheme } from "@/utils/color-scheme";
import {
  Box,
  Burger,
  Button,
  Drawer,
  Group,
  ScrollArea,
  Text,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import classes from "./Header.module.css";

export default function Header() {
  const { status } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text
            component={Link}
            href="/"
            variant="gradient"
            fz="xl"
            fw="bolder"
          >
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Text>

          <Group visibleFrom="sm">
            {status === "unauthenticated" && (
              <>
                <Button component={Link} href="/login" variant="default">
                  Log in
                </Button>
                <Button component={Link} href="/register" variant="gradient">
                  Sign up
                </Button>
              </>
            )}

            {status === "authenticated" && (
              <Button component={Link} href="/dashboard" variant="gradient">
                Go to Dashboard
              </Button>
            )}

            <Button
              variant="default"
              onClick={() =>
                setColorScheme(getColorScheme() === "light" ? "dark" : "light")
              }
            >
              <IconSun
                className={cx(classes.icon, classes.light)}
                stroke={1.5}
              />
              <IconMoon
                className={cx(classes.icon, classes.dark)}
                stroke={1.5}
              />
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Group justify="center" grow pb="xl" px="md">
            {status === "unauthenticated" && (
              <>
                <Button component={Link} href="/login" variant="default">
                  Log in
                </Button>
                <Button component={Link} href="/register" variant="gradient">
                  Sign up
                </Button>
              </>
            )}

            {status === "authenticated" && (
              <Button component={Link} href="/dashboard" variant="gradient">
                Go to Dashboard
              </Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

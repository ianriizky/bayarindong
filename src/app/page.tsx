"use client";

import {
  Button,
  Container,
  Group,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconBook, IconLogin, IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import Link from "next/link";
import classes from "./page.module.css";

export default function Page() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          <Text component="span" variant="gradient" inherit>
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Text>{" "}
          Payment Gateway
        </h1>

        <Text className={classes.description} c="dimmed">
          {process.env.NEXT_PUBLIC_APP_NAME} helps you to receive payment from
          many platform.
        </Text>
        <Text c="dimmed">
          This application is using Next.js and ElysiaJS{" "}
          <strong style={{ textDecoration: "underline" }}>
            made for learning purpose
          </strong>
          .
        </Text>

        <Group className={classes.controls}>
          <Button
            component={Link}
            href="/register"
            size="xl"
            className={classes.control}
            variant="gradient"
          >
            Sign Up Now
          </Button>

          <Button
            component={Link}
            href="/login"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<IconLogin size={20} />}
          >
            Sign In
          </Button>
        </Group>

        <Group my={20}>
          <Button
            component={Link}
            href="/api/doc"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<IconBook size={20} />}
          >
            API Documentation
          </Button>

          <Button
            size="xl"
            variant="default"
            className={classes.control}
            onClick={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
          >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
          </Button>
        </Group>
      </Container>
    </div>
  );
}

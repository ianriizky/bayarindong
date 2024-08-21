"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button, Container, Group, Text } from "@mantine/core";
import { IconBook } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import classes from "./page.module.css";

export default function Page() {
  const { status } = useSession();

  return (
    <div className={classes.wrapper}>
      <Header />

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
            href={status === "unauthenticated" ? "/register" : "/dashboard"}
            size="xl"
            className={classes.control}
            variant="gradient"
          >
            Get Started
          </Button>

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
        </Group>
      </Container>

      <Footer />
    </div>
  );
}

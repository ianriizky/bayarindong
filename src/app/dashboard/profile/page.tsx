"use client";

import { Avatar, Container, Paper, rem, Text, TextInput } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <Container size="sm">
      <Paper p="md" shadow="sm" radius="md" withBorder>
        <Avatar src={session?.user?.image} size={120} radius={120} mx="auto" />
        <Text ta="center" fz="lg" fw={500} mt="md">
          {session?.user?.name}
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          {session?.user?.email} • {session?.user?.role_name}
        </Text>

        <TextInput
          mt="lg"
          label="Access Token"
          placeholder="Your access token"
          value={session?.user?.access_token || ""}
          readOnly
          rightSectionPointerEvents="all"
          rightSection={
            session?.user?.access_token && (
              <IconCopy
                style={{ cursor: "pointer" }}
                aria-label="Copy access token"
                color={
                  clipboard.copied
                    ? "var(--mantine-color-orange-5)"
                    : "var(--mantine-color-dimmed)"
                }
                onClick={() => {
                  clipboard.copy(session?.user?.access_token || "");

                  notifications.show({
                    icon: (
                      <IconCheck style={{ width: rem(20), height: rem(20) }} />
                    ),
                    color: "teal",
                    title: "Success",
                    message: "Access token copied successfully.",
                  });
                }}
              />
            )
          }
        />
      </Paper>
    </Container>
  );
}

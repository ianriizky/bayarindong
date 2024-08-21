"use client";

import { Container, Paper, rem, Stack, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  return (
    <Container size="sm">
      <Paper p="md" shadow="sm" radius="md" withBorder>
        <Stack>
          <Title order={3}>Profile</Title>

          <TextInput
            label="Name"
            value={session?.user?.name || ""}
            radius="md"
            readOnly
          />

          <TextInput
            label="E-mail"
            value={session?.user?.email || ""}
            radius="md"
            readOnly
          />

          <TextInput
            label="Role"
            value={session?.user?.role_name || ""}
            radius="md"
            readOnly
          />

          <TextInput
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
                  onClick={() => {
                    navigator.clipboard.writeText(
                      session?.user?.access_token || ""
                    );

                    notifications.show({
                      icon: (
                        <IconCheck
                          style={{ width: rem(20), height: rem(20) }}
                        />
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
        </Stack>
      </Paper>
    </Container>
  );
}

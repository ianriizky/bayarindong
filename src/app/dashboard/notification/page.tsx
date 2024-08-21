"use client";

import { client } from "@/lib/client";
import { getToken } from "@/lib/firebase/messaging";
import {
  Button,
  Container,
  Group,
  Paper,
  rem,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

export default function Page() {
  const { data: session } = useSession();
  const [response, setResponse] =
    useState<Awaited<ReturnType<typeof client.api.notification.get>>>();

  const [isSubscribeButtonEnabled, setIsSubscribeButtonEnabled] =
    useState<boolean>(true);
  const [isSubscribeButtonLoading, handlerIsSubscribeButtonLoading] =
    useDisclosure(false);
  const [textSubscribeButton, setTextSubscribeButton] =
    useState<string>("Subscribe Now");
  const handleSubscribe: MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      if (!session?.user.access_token) {
        return;
      }

      try {
        handlerIsSubscribeButtonLoading.open();
        const permission = await Notification.requestPermission();

        if (permission === "denied") {
          throw new Error(
            "You do not allow the app to show notifications. Please check the notification setting on your browser."
          );
        }

        await navigator.serviceWorker.register("../firebase-messaging-sw.js");
        const token = await getToken(await navigator.serviceWorker.ready);
        const response = await client.api.fcm.post(
          { token },
          { headers: { Authorization: `Bearer ${session?.user.access_token}` } }
        );

        if (response.status !== 201) {
          throw new Error(
            ((response?.error?.value as Error)?.message as string) ||
              "Failed to subscribe."
          );
        }

        notifications.show({
          icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
          color: "teal",
          title: "Success",
          message: "Login successfully.",
        });
      } catch (error) {
        notifications.show({
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          color: "red",
          title: "Error",
          message: (error as Error)?.message,
        });
        console.error(error);
      } finally {
        setIsSubscribeButtonEnabled(Notification.permission === "default");
        handlerIsSubscribeButtonLoading.close();
        setTextSubscribeButton(
          Notification.permission === "granted" ? "Subscribed" : "Blocked"
        );
      }
    }, [handlerIsSubscribeButtonLoading, session?.user.access_token]);

  useEffect(() => {
    if (!session?.user?.access_token) {
      return;
    }

    (async () => {
      const response = await client.api.notification.get({
        headers: { Authorization: `Bearer ${session?.user?.access_token}` },
      });

      setResponse(response);
    })();
  }, [session?.user?.access_token]);

  return (
    <Container size="xl">
      <Paper p="md" shadow="sm" radius="md" withBorder>
        <Stack>
          <Group>
            <Title order={3}>Notification</Title>
            <Button
              variant="gradient"
              radius="xl"
              onClick={handleSubscribe}
              disabled={!isSubscribeButtonEnabled}
              loading={isSubscribeButtonLoading}
            >
              {textSubscribeButton}
            </Button>
          </Group>

          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Message</Table.Th>
                <Table.Th>Already Read</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {response?.data?.data?.map((notification, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{notification.title}</Table.Td>
                  <Table.Td>{notification.message}</Table.Td>
                  <Table.Td>{notification.is_read ? "Yes" : "No"}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Stack>
      </Paper>
    </Container>
  );
}

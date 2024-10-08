"use client";

import { client } from "@/lib/client";
import {
  Avatar,
  Container,
  Group,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const [response, setResponse] =
    useState<Awaited<ReturnType<typeof client.api.order.get>>>();

  useEffect(() => {
    if (!session?.user?.access_token) {
      return;
    }

    (async () => {
      const response = await client.api.order.get({
        headers: { Authorization: `Bearer ${session?.user?.access_token}` },
      });

      setResponse(response);
    })();
  }, [session?.user?.access_token]);

  return (
    <Container size="xl">
      <Paper p="md" shadow="sm" radius="md" withBorder>
        <Stack>
          <Title order={3}>Transaction History</Title>

          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>User</Table.Th>
                <Table.Th>E-mail</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Timestamp</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {response?.data?.data?.map((order, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar
                        size={26}
                        src={order.user.gravatar_image}
                        radius={26}
                      />
                      <Text size="sm" fw={500}>
                        {order.user.name}
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>{order.user.email}</Table.Td>
                  <Table.Td>{order.user.role_name}</Table.Td>
                  <Table.Td>{order.type}</Table.Td>
                  <Table.Td>
                    {order.status} ({order.status_code})
                  </Table.Td>
                  <Table.Td>{order.parsed_amount}</Table.Td>
                  <Table.Td>
                    {new Date(order.timestamp).toLocaleString()}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Stack>
      </Paper>
    </Container>
  );
}

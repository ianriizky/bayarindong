"use client";

import { client } from "@/lib/client";
import { OrderType } from "@/typebox/order";
import {
  Button,
  Container,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Paper,
  Radio,
  rem,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

const orderTypes = ["deposit", "withdraw"];

export default function Page() {
  const { data: session } = useSession();

  const [response, setResponse] =
    useState<Awaited<ReturnType<typeof client.api.order.get>>>();

  const fetchList = useCallback(async () => {
    const response = await client.api.order.get({
      headers: { Authorization: `Bearer ${session?.user?.access_token}` },
    });

    setResponse(response);
  }, [session?.user?.access_token]);

  useEffect(() => {
    if (!session?.user?.access_token) {
      return;
    }

    fetchList();
  }, [session?.user?.access_token]);

  const form = useForm({
    initialValues: {
      type: "deposit" as OrderType,
      amount: 0,
      timestamp: new Date(),
    },

    validate: {
      type: (value) =>
        orderTypes.includes(value)
          ? null
          : `Order type must be ${orderTypes.join(" or ")}`,
      amount: (value) =>
        !Number.isNaN(value) ? null : "Amount must be a number",
    },
  });

  const [
    isModalCreateOpen,
    { open: openModalCreate, close: closeModalCreate },
  ] = useDisclosure(false);
  const [isSubmitButtonLoading, handlerIsSubmitButtonLoading] =
    useDisclosure(false);
  const formSubmitHandler: Parameters<typeof form.onSubmit>[0] = useCallback(
    async (values) => {
      if (!session?.user.access_token) {
        return;
      }

      try {
        handlerIsSubmitButtonLoading.open();
        const response = await client.api[values.type].post(
          {
            amount: values.amount,
            timestamp: values.timestamp.toISOString(),
          },
          {
            headers: { Authorization: `Bearer ${session?.user.access_token}` },
          }
        );

        if (response.status !== 200) {
          throw new Error(
            ((response?.error?.value as Error)?.message as string) ||
              `Failed to create ${values.type}.`
          );
        }

        notifications.show({
          icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
          color: "teal",
          title: "Success",
          message:
            response.data?.message || "Deposit & withdraw created successfuly.",
        });
        closeModalCreate();
      } catch (error) {
        notifications.show({
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          color: "red",
          title: "Error",
          message: (error as Error)?.message,
        });
        console.error(error);
      } finally {
        handlerIsSubmitButtonLoading.close();
        await fetchList();
      }
    },
    [session?.user.access_token]
  );

  return (
    <Container size="xl">
      <Paper p="md" shadow="sm" radius="md" withBorder>
        <Stack>
          <Group>
            <Title order={3}>Deposit & Withdraw</Title>
            <Button variant="gradient" radius="xl" onClick={openModalCreate}>
              Create
            </Button>
          </Group>

          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Type</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Timestamp</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {response?.data?.data?.map((order, index) => (
                <Table.Tr key={index}>
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

      <Modal
        opened={isModalCreateOpen}
        onClose={closeModalCreate}
        title="Create Deposit & Withdraw"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form onSubmit={form.onSubmit(formSubmitHandler)}>
          <Stack>
            <LoadingOverlay
              visible={isSubmitButtonLoading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
              loaderProps={{
                color: "var(--mantine-color-orange-5)",
                type: "bars",
              }}
            />

            <Radio.Group
              required
              label="Select your transaction type"
              description="Deposit / Withdraw"
              value={form.values.type}
              onChange={(value) =>
                form.setFieldValue("type", value as OrderType)
              }
              name="type"
              error={form.errors.type}
            >
              <Group mt="xs">
                {["deposit", "withdraw"].map((orderType, index) => (
                  <Radio
                    radius="md"
                    key={index}
                    value={orderType}
                    label={orderType}
                  />
                ))}
              </Group>
            </Radio.Group>

            <NumberInput
              required
              label="Amount"
              placeholder="You can enter only 2 digits after decimal point"
              decimalScale={2}
              value={form.values.amount}
              onChange={(value) => form.setFieldValue("amount", Number(value))}
              error={form.errors.amount}
              radius="md"
            />

            <DateTimePicker
              required
              withSeconds
              label="Timestamp"
              placeholder="Date with time"
              value={form.values.timestamp}
              onChange={(value) => {
                if (value) {
                  form.setFieldValue("timestamp", value);
                }
              }}
            />
          </Stack>

          <Group mt="md">
            <Button
              type="submit"
              variant="gradient"
              loading={isSubmitButtonLoading}
            >
              Submit
            </Button>
            <Button variant="default" onClick={closeModalCreate}>
              Cancel
            </Button>
          </Group>
        </form>
      </Modal>
    </Container>
  );
}

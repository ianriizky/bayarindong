"use client";

import { Container, Paper, Stack, Text, Title } from "@mantine/core";

export default function Page() {
  return (
    <Container size="lg">
      <Paper p="md" shadow="sm" radius="md" withBorder>
        <Stack>
          <Title order={1}>Welcome to the Admin Dashboard</Title>

          <Text>This is your main content area.</Text>
        </Stack>
      </Paper>
    </Container>
  );
}

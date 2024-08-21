"use client";

import {
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  rem,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconArrowNarrowLeft, IconCheck, IconX } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [isFormLoading, handlerIsFormLoading] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const formSubmitHandler: Parameters<typeof form.onSubmit>[0] = async (
    values
  ) => {
    handlerIsFormLoading.open();
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    handlerIsFormLoading.close();

    if (!response?.ok) {
      notifications.show({
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: "red",
        title: "Error",
        message:
          response?.error === "CredentialsSignin"
            ? "Invalid credentials"
            : "Something went wrong",
      });

      return;
    }

    notifications.show({
      icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
      color: "teal",
      title: "Success",
      message: "Login successfully.",
    });

    router.push("/dashboard");
  };

  return (
    <Container size={420} my={40}>
      <Paper radius="md" p="xl" withBorder pos="relative">
        <LoadingOverlay
          visible={isFormLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{
            color: "var(--mantine-color-orange-5)",
            type: "bars",
          }}
        />

        <Divider
          labelPosition="left"
          label={
            <>
              <IconArrowNarrowLeft size={12} />
              <Anchor component={Link} href="/" c="dimmed" size="xs" ml={5}>
                Back to Homepage
              </Anchor>
            </>
          }
          my="lg"
        />

        <Text size="lg" fw={500} my="lg">
          Sign in to{" "}
          <Text component={Link} href="/" variant="gradient" inherit>
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Text>
        </Text>

        <form onSubmit={form.onSubmit(formSubmitHandler)}>
          <Stack>
            <TextInput
              required
              label="E-mail"
              placeholder="hello@mail.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={form.errors.password}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component={Link}
              href="/register"
              type="button"
              c="dimmed"
              size="xs"
            >
              Don&apos;t have an account? Register
            </Anchor>
            <Button
              type="submit"
              radius="xl"
              variant="gradient"
              loading={isFormLoading}
            >
              Sign In
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

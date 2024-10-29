import {
  Button,
  Flex,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Form, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { action } from "~/routes/_app._index";

export default function LoginPage() {
  const actionData = useActionData<typeof action>();

  console.log(actionData);

  useEffect(() => {
    if (actionData && actionData?.error) {
      notifications.show({
        title: "Ooops...",
        message: actionData.error || `Terjadi kesalahan saat login`,
        color: "red",
        position: "top-center",
      });
    }
  }, [actionData]);

  return (
    <Flex direction="column" gap="md">
      <Paper p="lg">
        <Title size="24px">Selamat Datang!</Title>
        <Form method="POST">
          <Flex direction="column" gap="md" mt="lg">
            <TextInput
              label="Username"
              placeholder="Cth: wasissapto"
              name="username"
              required
              radius="xl"
            />
            <PasswordInput
              label="Password"
              placeholder="Cth: *******"
              name="password"
              required
              type="password"
              radius="xl"
            />
            <Button
              variant="filled"
              color="greenBrand"
              radius="xl"
              type="submit"
            >
              Login
            </Button>
          </Flex>
        </Form>
        <Text style={{ textAlign: "center" }} mt="lg">
          Belum punya akun?{" "}
          <Text component="a" c="greenBrand" fw="bold" href="/register">
            Daftar
          </Text>
        </Text>
      </Paper>
    </Flex>
  );
}

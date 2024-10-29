import {
  Avatar,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { IconAt, IconLogout } from "@tabler/icons-react";
import { loader } from "~/routes/panel.profile";

export default function ProfilePage() {
  const { user } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const form = useForm({
    initialValues: {
      email: user?.email || "",
      phone: user?.userExtend.phoneNumber || "",
      nik: user?.userExtend.nik || "",
      fullName: user?.userExtend.fullName || "",
      username: user?.username || "",
      group: user?.hasGroups[0] || "",
    },
  });

  return (
    <Flex direction="column" gap="sm">
      <Card padding="lg" radius="md">
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={125}
            alt="Norway"
          />
        </Card.Section>

        <Flex direction="column" mt="-50px" align="center">
          <Avatar
            color="white"
            bg="cyan.6"
            radius="100%"
            size="xl"
            name={user?.userExtend.fullName}
          />
          <Text size="xl" fw="bold">
            {user?.userExtend.fullName}
          </Text>
          <Text size="sm" c="dimmed">
            {user?.hasGroups[0]}
          </Text>

          <Button
            size="xs"
            color="blue"
            mt="md"
            radius="md"
            onClick={() => submit({}, { method: "DELETE" })}
            leftSection={<IconLogout size="16px" />}
          >
            Logout
          </Button>
        </Flex>
      </Card>
      <Paper p="sm" radius="md">
        <Text size="lg" fw="bold">
          Edit Profile
        </Text>
        <Flex direction="column" gap="xs" mt="sm">
          <TextInput
            label="Nama Lengkap"
            placeholder="Cth: Wasis Sapto"
            key={form.key("fullName")}
            {...form.getInputProps("fullName")}
          />
          <Group grow>
            <TextInput
              label="Email"
              type="email"
              placeholder="Cth: wasis@gmail.com"
              leftSection={<IconAt size={14} />}
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <TextInput
              label="No. Handphone"
              leftSection="+62"
              leftSectionWidth="50px"
              type="number"
              placeholder="Cth: 82682830923"
              key={form.key("phone")}
              {...form.getInputProps("phone")}
            />
          </Group>
          <TextInput
            label="NIK"
            type="number"
            placeholder="Cth: 3578127309203003"
          />
          <TextInput
            label="Username"
            placeholder="Cth : wasissapto"
            disabled
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <TextInput
            label="Password"
            description="Isi jika ingin mengganti password"
            placeholder="Cth: ******"
          />
          <Button mt="sm" radius="md">
            Update Profile
          </Button>
        </Flex>
      </Paper>
    </Flex>
  );
}

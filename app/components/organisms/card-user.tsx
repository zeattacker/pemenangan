import { Avatar, Badge, Button, Flex, Paper, Text } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { User } from "~/domain/entities/user.entity";

export default function CardUser({ user }: { user: User }) {
  const navigate = useNavigate();

  return (
    <Paper p="md" radius="md">
      <Flex direction="row" gap="md" align="center">
        <Avatar name={user.username} color="initials" />
        <Flex direction="column" w="100%">
          <Flex direction="row" justify="space-between">
            <Text fw={500}>{user.username}</Text>
            <Badge color={user.isActive ? "green" : "red"}>
              {user.isActive ? "AKTIF" : "BELUM AKTIF"}
            </Badge>
          </Flex>
          <Text size="xs">{user.email || "-"}</Text>
        </Flex>
      </Flex>
      <Flex gap="sm" mt="md">
        <Button
          leftSection={<IconPencil size="16px" />}
          radius="md"
          size="xs"
          color="green"
          variant="outline"
          fullWidth
          onClick={() =>
            navigate(`/panel/users/manage/${user.id}`, { state: user })
          }
        >
          Edit
        </Button>
        <Button
          leftSection={<IconTrash size="16px" />}
          radius="md"
          size="xs"
          color="red"
          variant="outline"
          fullWidth
        >
          Hapus
        </Button>
      </Flex>
    </Paper>
  );
}

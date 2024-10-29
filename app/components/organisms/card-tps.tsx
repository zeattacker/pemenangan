import { Button, Flex, Paper, Text } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { TPS } from "~/domain";

export default function CardTps({ tps }: { tps: TPS }) {
  const navigate = useNavigate();

  return (
    <Paper p="md" radius="md">
      <Flex direction="row" gap="md" align="center">
        <Flex direction="column" w="100%">
          <Text size="xs" c="gray.7">
            Nama TPS
          </Text>
          <Text fw={500} size="sm">
            {tps.name}
          </Text>
        </Flex>
        <Flex direction="column" w="100%">
          <Text size="xs" c="gray.7">
            Nama Desa
          </Text>
          <Text fw={500} size="sm">
            {tps.village.name}
          </Text>
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
          onClick={() => navigate(`/panel/tps/manage/${tps.id}`)}
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

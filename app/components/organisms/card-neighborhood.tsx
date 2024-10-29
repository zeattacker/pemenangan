import { Button, Flex, Group, Paper, Text } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Neighborhood } from "~/domain";

export default function CardNeighborhood({
  neighborhood,
}: {
  neighborhood: Neighborhood;
}) {
  const navigate = useNavigate();

  return (
    <Paper p="md" radius="md">
      <Flex direction="row" gap="md" align="center">
        <Flex direction="column" w="100%">
          <Text size="xs" c="gray.7">
            Nama
          </Text>
          <Text fw={500} size="sm">
            {neighborhood.name}
          </Text>
        </Flex>
        <Group grow w="100%">
          <Button
            leftSection={<IconPencil size="16px" />}
            radius="md"
            size="xs"
            color="green"
            variant="outline"
            fullWidth
            onClick={() =>
              navigate(`/panel/neighborhood/manage/${neighborhood.id}`, {
                state: neighborhood,
              })
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
        </Group>
        {/* <Flex direction="column" w="100%">
          <Text size="xs" c="gray.7">
            Kota
          </Text>
          <Text fw={500} size="sm">
            {dis}
          </Text>
        </Flex> */}
      </Flex>
    </Paper>
  );
}

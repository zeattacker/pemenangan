import { Button, Flex, Group, Paper, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export default function CardRecap() {
  return (
    <Paper p="md" radius="md">
      <Flex direction="column" gap="md" align="center">
        <Group grow w="100%">
          <Flex direction="column" w="100%">
            <Flex direction="column" w="100%">
              <Text size="xs" c="gray.7">
                Nama Calon
              </Text>
              <Text fw={500} size="sm">
                Paslon 1 - Paslon 2
              </Text>
            </Flex>
            <Group grow mt="md">
              <Flex direction="column" w="100%">
                <Text size="xs" c="gray.7">
                  Kelurahan
                </Text>
                <Text fw={500} size="sm">
                  Jabung
                </Text>
              </Flex>
              <Flex direction="column" w="100%">
                <Text size="xs" c="gray.7">
                  TPS
                </Text>
                <Text fw={500} size="sm">
                  TPS 001
                </Text>
              </Flex>
            </Group>
            <Group grow mt="md">
              <Flex direction="column" w="100%">
                <Text size="xs" c="gray.7">
                  Suara Sah
                </Text>
                <Text fw={500} size="sm">
                  100
                </Text>
              </Flex>
              <Flex direction="column" w="100%">
                <Text size="xs" c="gray.7">
                  Suara Tidak Sah
                </Text>
                <Text fw={500} size="sm">
                  100
                </Text>
              </Flex>
            </Group>
          </Flex>
        </Group>
        <Group grow w="100%">
          <Button
            leftSection={<IconPencil size="16px" />}
            radius="md"
            size="xs"
            color="green"
            variant="outline"
            fullWidth
            // onClick={() =>
            //   navigate(`/panel/candidate/manage/${candidate.id}`, {
            //     state: candidate,
            //   })
            // }
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
      </Flex>
    </Paper>
  );
}

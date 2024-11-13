import { Button, Flex, Group, Paper, Text } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Recap } from "~/domain/entities/recap.entity";

export default function CardRecap({ recap }: { recap: Recap }) {
  const navigate = useNavigate();
  return (
    <Paper p="md" radius="md">
      <Flex direction="column" gap="md" align="center">
        <Group grow w="100%">
          <Flex direction="column" w="100%">
            <Group grow mt="md">
              <Flex direction="column" w="100%">
                <Text size="xs" c="gray.7">
                  TPS
                </Text>
                <Text fw={500} size="sm">
                  {recap?.name}
                </Text>
              </Flex>
              <Flex direction="column" w="100%">
                <Text size="xs" c="gray.7">
                  Kelurahan
                </Text>
                <Text fw={500} size="sm">
                  {recap?.village.name}
                </Text>
              </Flex>
              <Flex direction="column" w="100%">
                <Text size="xs" c="gray.7">
                  Suara Tidak Sah
                </Text>
                <Text fw={500} size="sm">
                  {recap?.invalidVote}
                </Text>
              </Flex>
            </Group>
            <Group grow mt="md">
              {recap?.candidates?.map((item) => {
                return (
                  <Flex direction="column" w="100%" key={item.id}>
                    <Text size="xs" c="gray.7">
                      Nama Calon
                    </Text>
                    <Text fw={500} size="sm">
                      {item.name}
                    </Text>
                    <Text size="xs" c="gray.7" mt="sm">
                      Suara Sah
                    </Text>
                    <Text fw={500} size="sm">
                      {item.validVote}
                    </Text>
                  </Flex>
                );
              })}
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
            onClick={() =>
              navigate(`/panel/recap/manage/${recap.id}`, {
                state: recap,
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
            onClick={() =>
              navigate(`/panel/recap/delete/${recap.id}`, {
                state: recap,
              })
            }
          >
            Hapus
          </Button>
        </Group>
      </Flex>
    </Paper>
  );
}

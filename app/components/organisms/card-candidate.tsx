import { Button, Flex, Group, Paper, Text } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Candidate } from "~/domain/entities/candidate.entity";

export default function CardCandidate({ candidate }: { candidate: Candidate }) {
  const navigate = useNavigate();
  return (
    <Paper p="md" radius="md">
      <Flex direction="column" gap="md" align="center">
        <Group grow w="100%">
          <Flex direction="column" w="100%">
            <Text size="xs" c="gray.7">
              Nama Calon
            </Text>
            <Text fw={500} size="sm">
              {candidate?.name}
            </Text>
          </Flex>
          <Flex direction="column" w="100%">
            <Text size="xs" c="gray.7">
              Nama Wakil Calon
            </Text>
            <Text fw={500} size="sm">
              {candidate?.viceName}
            </Text>
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
              navigate(`/panel/candidate/manage/${candidate.id}`, {
                state: candidate,
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
      </Flex>
    </Paper>
  );
}

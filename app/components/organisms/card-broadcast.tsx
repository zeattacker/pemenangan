import { Avatar, Box, Flex, Paper, Text } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { Broadcast } from "~/domain/entities/broadcast.entity";
import moment from "moment";

export default function CardBroadcast({ broadcast }: { broadcast: Broadcast }) {
  return (
    <Paper p="md" radius="md">
      <Flex direction="column">
        <Flex align="center" justify="space-between">
          <Flex gap="xs" align="center">
            <Avatar
              color="cyan"
              radius="xl"
              name={broadcast.author.userExtend.fullName}
            />
            <Box>
              <Text size="sm" fw={500}>
                {broadcast.author.userExtend.fullName}
              </Text>
              <Text size="xs" c="gray.7">
                {broadcast.author.hasGroups[0]}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Text fw={500} mt="xs">
          {broadcast.title}
        </Text>
        <Text size="sm" c="gray.7">
          {broadcast.description}
        </Text>
        <Flex direction="row" mt="sm" justify="flex-end" align="center">
          <Flex align="center" gap="4px">
            <IconClock size="16px" />
            <Text size="xs" c="gray.7">
              {moment(broadcast.createdAt).fromNow()}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
}

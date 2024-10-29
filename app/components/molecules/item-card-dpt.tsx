import { ActionIcon, Box, Flex, Text } from "@mantine/core";

export default function ItemCardDpt({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <Flex direction="row" gap="xs" style={{ flexGrow: 0 }} align="center">
      <ActionIcon size="lg" radius="xl">
        {icon}
      </ActionIcon>
      <Box>
        <Text size="sm" c="gray.7">
          {title}
        </Text>
        <Text size="sm" fw={500}>
          {content}
        </Text>
      </Box>
    </Flex>
  );
}

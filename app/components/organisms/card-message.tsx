import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Flex,
  Group,
  Image,
  Menu,
  Paper,
  rem,
  Text,
} from "@mantine/core";
import {
  IconClock,
  IconDotsCircleHorizontal,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { Message } from "~/domain/entities/message.entity";

export default function CardMessage({ message }: { message: Message }) {
  return (
    <Paper p="md" radius="md">
      <Flex direction="column">
        <Flex align="center" justify="space-between">
          <Flex gap="xs" align="center">
            <Avatar color="cyan" radius="xl">
              WS
            </Avatar>
            <Box>
              <Text size="sm" fw={500}>
                Wasis Sapto
              </Text>
              <Text size="xs" c="gray.7">
                Relawan
              </Text>
            </Box>
          </Flex>

          <Menu shadow="sm">
            {/* Menu content */}
            <Menu.Target>
              <ActionIcon variant="transparent" color="dark">
                <IconDotsCircleHorizontal />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconPencil style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Edit
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Hapus
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
        <Text fw={500} mt="xs">
          Mohon untuk berkoordinasi dengan ketua rw/rt setempat
        </Text>
        <Text size="sm" c="gray.7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </Text>
        <Group mt="sm">
          <Image
            radius="md"
            h={75}
            w={75}
            style={{ cursor: "pointer" }}
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
          />
          <Image
            radius="md"
            h={75}
            w={75}
            style={{ cursor: "pointer" }}
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
          />
        </Group>
        <Flex direction="row" mt="sm" justify="space-between" align="center">
          <Badge color="blue" style={{ flexShrink: 0 }}>
            Terkirim
          </Badge>
          <Flex align="center" gap="4px">
            <IconClock size="16px" />
            <Text size="xs" c="gray.7">
              12 hari yang lalu
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
}

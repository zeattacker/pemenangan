import {
  ActionIcon,
  Divider,
  Flex,
  Menu,
  Paper,
  rem,
  SimpleGrid,
  Text,
} from "@mantine/core";
import {
  IconBuildings,
  IconCheck,
  IconDotsCircleHorizontal,
  IconEye,
  IconIdBadge,
  IconPencil,
  IconPencilBolt,
  IconTrash,
} from "@tabler/icons-react";
import ItemCardDpt from "../molecules/item-card-dpt";
import { useNavigate } from "@remix-run/react";
import { Voter } from "~/domain";

export default function CardVoter({
  voter,
}: {
  voter: Voter;
  onSelect: () => void;
}) {
  const navigate = useNavigate();

  return (
    <Paper p="md" radius="md">
      <Flex direction="row" justify="space-between" align="center">
        <Text fw={500}>{voter.dpt.name}</Text>

        <Menu shadow="md">
          <Menu.Target>
            <ActionIcon variant="transparent" color="dark">
              <IconDotsCircleHorizontal />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconEye style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={() =>
                navigate(`/panel/voter/view/${voter.id}`, {
                  state: voter,
                })
              }
            >
              Lihat
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={() => navigate(`/panel/voter/delete/${voter.id}`)}
            >
              Hapus
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Divider my="xs" />
      <SimpleGrid cols={2} my="xs">
        <ItemCardDpt
          icon={<IconBuildings size="16px" />}
          title="TPS"
          content={voter.dpt.votingStation.name}
        />
        <ItemCardDpt
          icon={<IconPencilBolt size="16px" />}
          title="RT/RW"
          content={`${voter.dpt.rt}/${voter.dpt.rw}`}
        />
        <ItemCardDpt
          icon={<IconIdBadge size="16px" />}
          title="Kelurahan"
          content={voter.dpt.village.name}
        />
        <ItemCardDpt
          icon={<IconCheck size="16px" />}
          title="Status"
          content={voter?.isActive ? "Aktif" : "Nonaktif"}
        />
      </SimpleGrid>
    </Paper>
  );
}

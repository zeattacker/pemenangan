import { Avatar, Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { IconClock, IconPlus } from "@tabler/icons-react";
import CardBroadcast from "~/components/organisms/card-broadcast";
import { loader } from "~/routes/panel.broadcast";

export default function BroadcastPage() {
  const { broadcasts, user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Flex direction="column" gap="sm">
      <Paper p="sm" radius="md">
        <Flex gap="sm" justify="space-between">
          <Box>
            <Text size="xl" fw="bold">
              Broadcast
            </Text>
            <Text c="gray.7" size="sm">
              Lihat pesan broadcast yang dikirimkan oleh atasan
            </Text>
          </Box>
          {(user?.hasGroups.includes("Korcam") ||
            user?.hasGroups.includes("Korkel") ||
            user?.hasGroups.includes("Admin")) && (
            <Button
              style={{ flexShrink: 0 }}
              leftSection={<IconPlus size="20px" />}
              onClick={() => navigate("/panel/broadcast/manage")}
              color="greenBrand"
            >
              Buat
            </Button>
          )}
        </Flex>
      </Paper>
      {broadcasts?.data?.map((item) => {
        return <CardBroadcast key={item.id} broadcast={item} />;
      })}
      <Outlet />
    </Flex>
  );
}

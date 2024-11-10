import { Box, Button, Flex, Paper, Tabs, Text } from "@mantine/core";
import { Outlet, useNavigate, useParams } from "@remix-run/react";
import {
  IconDatabase,
  IconPlus,
  IconPresentationAnalytics,
} from "@tabler/icons-react";

export default function ReportPage() {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <Flex direction="column" gap="sm">
      <Paper p="sm" radius="md">
        <Flex gap="sm">
          <Box>
            <Text size="xl" fw="bold">
              Laporan
            </Text>
            <Text c="gray.7" size="sm">
              Lihat laporan rekapitulasi dan pendataan melalui halaman ini
            </Text>
          </Box>
        </Flex>
      </Paper>
      <Paper p="sm" radius="md">
        <Tabs
          defaultValue="data"
          value={tabValue}
          onChange={(value) => navigate(`/panel/report/${value}`)}
        >
          <Tabs.List grow>
            <Tabs.Tab value="data" leftSection={<IconDatabase />}>
              Pendataan
            </Tabs.Tab>
            <Tabs.Tab value="recap" leftSection={<IconPresentationAnalytics />}>
              Rekapitulasi
            </Tabs.Tab>
          </Tabs.List>
          <Outlet />
        </Tabs>
      </Paper>
    </Flex>
  );
}

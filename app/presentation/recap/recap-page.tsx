import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Outlet, useNavigate } from "@remix-run/react";
import { IconPlus } from "@tabler/icons-react";
import CardRecap from "~/components/organisms/card-recap";

export default function RecapPage() {
  const navigate = useNavigate();
  return (
    <Flex direction="column" gap="sm">
      <Paper p="sm" radius="md">
        <Flex gap="sm">
          <Box>
            <Text size="xl" fw="bold">
              Rekapitulasi
            </Text>
            <Text c="gray.7" size="sm">
              Lihat dan atur rekapitulasi suara yang ada pada aplikasi
              pemenangan kamu
            </Text>
          </Box>
          <Button
            style={{ flexShrink: 0 }}
            leftSection={<IconPlus size="20px" />}
            onClick={() => navigate("/panel/recap/manage")}
            color="greenBrand"
          >
            Tambah
          </Button>
        </Flex>
      </Paper>
      {[1, 2, 3].map((item) => {
        return <CardRecap key={item} />;
      })}
      <Outlet />
    </Flex>
  );
}
import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { IconPlus } from "@tabler/icons-react";
import CardTps from "~/components/organisms/card-tps";
import { TPS } from "~/domain";
import { loader } from "~/routes/panel.tps";

export default function TpsPage() {
  const navigate = useNavigate();
  const tpss = useLoaderData<typeof loader>();

  return (
    <Flex direction="column" gap="sm">
      <Paper p="sm" radius="md">
        <Flex gap="sm">
          <Box>
            <Text size="xl" fw="bold">
              TPS
            </Text>
            <Text c="gray.7" size="sm">
              Lihat dan atur TPS yang ada pada aplikasi pemenangan kamu
            </Text>
          </Box>
          <Button
            style={{ flexShrink: 0 }}
            leftSection={<IconPlus size="20px" />}
            onClick={() => navigate("/panel/tps/manage")}
            color="greenBrand"
          >
            Tambah
          </Button>
        </Flex>
      </Paper>
      {tpss?.data?.map((item: TPS) => {
        return <CardTps key={item.id} tps={item} />;
      })}
      <Outlet />
    </Flex>
  );
}

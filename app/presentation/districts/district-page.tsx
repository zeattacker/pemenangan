import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { IconPlus } from "@tabler/icons-react";
import CardDistrict from "~/components/organisms/card-district";
import { District } from "~/domain";
import { loader } from "~/routes/panel.district";

export default function DistrictPage() {
  const navigate = useNavigate();
  const districts = useLoaderData<typeof loader>();

  return (
    <Flex direction="column" gap="sm">
      <Paper p="sm" radius="md">
        <Flex gap="sm">
          <Box>
            <Text size="xl" fw="bold">
              Kecamatan
            </Text>
            <Text c="gray.7" size="sm">
              Lihat dan atur kecamatan yang ada pada aplikasi pemenangan kamu
            </Text>
          </Box>
          <Button
            style={{ flexShrink: 0 }}
            leftSection={<IconPlus size="20px" />}
            onClick={() =>
              navigate("/panel/district/manage", {
                state: null,
              })
            }
            color="greenBrand"
          >
            Tambah
          </Button>
        </Flex>
      </Paper>
      {districts?.data?.map((item: District) => {
        return <CardDistrict key={item.id} district={item} />;
      })}
      <Outlet />
    </Flex>
  );
}

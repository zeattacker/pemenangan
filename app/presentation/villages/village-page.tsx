import {
  Box,
  Button,
  ComboboxData,
  Flex,
  Paper,
  Select,
  Text,
} from "@mantine/core";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { IconPlus } from "@tabler/icons-react";
import CardVillage from "~/components/organisms/card-village";
import { Village } from "~/domain";
import { loader } from "~/routes/panel.village";

export default function VillagePage() {
  const navigate = useNavigate();
  const { villages, districts } = useLoaderData<typeof loader>();

  return (
    <Flex direction="column" gap="sm">
      <Paper p="sm" radius="md">
        <Flex gap="sm">
          <Box>
            <Text size="xl" fw="bold">
              Kelurahan
            </Text>
            <Text c="gray.7" size="sm">
              Lihat dan atur kelurahan yang ada pada aplikasi pemenangan kamu
            </Text>
          </Box>
          <Button
            style={{ flexShrink: 0 }}
            leftSection={<IconPlus size="20px" />}
            onClick={() => navigate("/panel/village/manage")}
            color="greenBrand"
          >
            Tambah
          </Button>
        </Flex>
      </Paper>
      <Paper p="sm" radius="md">
        <Flex gap="sm" justify="space-between" align="center">
          <Text>Pilih Kecamatan</Text>
          <Select
            placeholder="Pilih kecamatan"
            data={(districts?.data as ComboboxData) || []}
            searchable
            onChange={(value) =>
              navigate(`/panel/village?districtId=${value || ""}`)
            }
          />
        </Flex>
      </Paper>
      {villages?.data?.map((item: Village) => {
        return <CardVillage key={item.id} village={item} />;
      })}
      <Outlet />
    </Flex>
  );
}

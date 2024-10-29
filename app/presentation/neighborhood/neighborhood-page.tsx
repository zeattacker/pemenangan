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
import { useState } from "react";
import { AreaSelect } from "~/components/atoms/AreaSelect";
import CardNeighborhood from "~/components/organisms/card-neighborhood";
import { Neighborhood } from "~/domain";
import { loader } from "~/routes/panel.neighborhood";

export default function NeighborhoodPage() {
  const [district, setDistrict] = useState("");
  const navigate = useNavigate();
  const { neighborhoods, districts } = useLoaderData<typeof loader>();

  return (
    <Flex direction="column" gap="sm">
      <Paper p="sm" radius="md">
        <Flex gap="sm">
          <Box>
            <Text size="xl" fw="bold">
              Lingkungan
            </Text>
            <Text c="gray.7" size="sm">
              Lihat dan atur lingkungan yang ada pada aplikasi pemenangan kamu
            </Text>
          </Box>
          <Button
            style={{ flexShrink: 0 }}
            leftSection={<IconPlus size="20px" />}
            onClick={() => navigate("/panel/neighborhood/manage")}
            color="greenBrand"
          >
            Tambah
          </Button>
        </Flex>
      </Paper>
      <Paper p="sm" radius="md">
        <Flex gap="sm" justify="space-between" align="center">
          <Select
            label="Pilih Kecamatan"
            placeholder="Pilih kecamatan"
            data={(districts?.data as ComboboxData) || []}
            searchable
            value={district}
            onChange={(value) => setDistrict(value || "")}
          />
          <AreaSelect
            label="Pilih Desa"
            area="villages"
            queryId={district}
            placeholder="Pilih Desa"
            onChange={(value) =>
              navigate(`/panel/neighborhood?villageId=${value}`)
            }
          />
        </Flex>
      </Paper>
      {neighborhoods?.data?.map((item: Neighborhood) => {
        return <CardNeighborhood key={item.id} neighborhood={item} />;
      })}
      <Outlet />
    </Flex>
  );
}

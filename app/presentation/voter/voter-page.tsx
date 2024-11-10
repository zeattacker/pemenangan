import {
  Box,
  Button,
  ComboboxData,
  Flex,
  Group,
  Paper,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
// import { getDptLoader } from "~/application/dpt";
import { IconPlus, IconRefresh, IconSearch } from "@tabler/icons-react";
import { useDebounce } from "@uidotdev/usehooks";
import { FormEvent, useEffect, useState } from "react";
import { AreaSelect } from "~/components/atoms/AreaSelect";
import CardVoter from "~/components/organisms/card-voter";
import { Voter } from "~/domain";
import { loader } from "~/routes/panel.voter";

export default function VoterPage() {
  const { voters, districts } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    status: searchParams.get("status") || "",
    search: searchParams.get("search") || "",
    limit: parseInt(searchParams.get("limit") || "10") || 10,
    districtId: searchParams.get("districtId") || "",
    villageId: searchParams.get("villageId") || "",
  });
  const debouncedSearchTerm = useDebounce(pagination.search, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setPagination({
        ...pagination,
        search: debouncedSearchTerm,
      });
    }
  }, [debouncedSearchTerm]);

  const handleNextPage = async (e: FormEvent) => {
    e.preventDefault();
    if (voters?.meta && pagination.limit < voters?.meta?.totalData) {
      setPagination({
        ...pagination,
        limit: pagination.limit + 10,
      });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams();

    // Only add non-empty params to URL
    Object.entries(pagination).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });

    navigate({
      pathname: "/panel/voter",
      search: `?${params.toString()}`,
    });
    console.log("called");
  }, [pagination]);

  return (
    <Flex direction="column" gap="sm">
      <Paper p="sm" radius="md">
        <Flex gap="sm">
          <Box>
            <Text size="xl" fw="bold">
              DPT
            </Text>
            <Text c="gray.7" size="sm">
              Lihat dan atur DPT yang ada pada aplikasi pemenangan kamu
            </Text>
          </Box>
          <Button
            style={{ flexShrink: 0 }}
            leftSection={<IconPlus size="20px" />}
            onClick={() => navigate("/panel/voter/manage")}
            color="greenBrand"
          >
            Tambah
          </Button>
        </Flex>
      </Paper>
      <Paper p="sm" radius="md">
        <Group grow>
          <TextInput
            label="Cari"
            leftSection={<IconSearch size="16px" />}
            placeholder="Cth: Wasis Sapto"
            radius="xl"
            value={pagination.search}
            onChange={(e) =>
              setPagination({
                ...pagination,
                search: e.target.value,
              })
            }
          />
          <Select
            radius="xl"
            data={[
              {
                value: "true",
                label: "Aktif",
              },
              {
                value: "false",
                label: "Nonaktif",
              },
            ]}
            placeholder="Pilih Status"
            value={pagination.status}
            onChange={(value) =>
              setPagination({
                ...pagination,
                status: value || "",
              })
            }
            label="Status"
          />
        </Group>
        <Group grow mt="sm">
          <Select
            label="Kecamatan"
            placeholder="Pilih kecamatan"
            data={(districts?.data as ComboboxData) || []}
            searchable
            key="districtId"
            name="districtId"
            value={pagination.districtId}
            onChange={(value) =>
              setPagination({
                ...pagination,
                districtId: value!,
              })
            }
          />
          <AreaSelect
            name="villageId"
            label="Kelurahan"
            placeholder="Pilih Kelurahan"
            area="villages"
            value={pagination.villageId}
            queryId={pagination.districtId}
            key="villageId"
            onChange={(value) => {
              const data = {
                ...pagination,
                villageId: value!,
              };
              if (value !== pagination.villageId) {
                data.districtId = pagination.districtId;
              }
              setPagination(data);
            }}
          />
        </Group>
      </Paper>
      {voters?.data.map((item: Voter) => {
        return (
          <CardVoter
            key={item.id}
            voter={item}
            onSelect={() => alert("test")}
          />
        );
      })}
      <Outlet />
      <Button
        leftSection={<IconRefresh />}
        variant="light"
        onClick={handleNextPage}
      >
        Muat Lebih Banyak
      </Button>
    </Flex>
  );
}

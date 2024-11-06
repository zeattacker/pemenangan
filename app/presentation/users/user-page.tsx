import {
  Box,
  Button,
  Flex,
  Group,
  Input,
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
import { IconPlus, IconRefresh, IconSearch } from "@tabler/icons-react";
import { useDebounce } from "@uidotdev/usehooks";
import { FormEvent, useEffect, useState } from "react";
import CardUser from "~/components/organisms/card-user";
import { loader } from "~/routes/panel.users";

export default function UserPage() {
  const navigate = useNavigate();
  const { users } = useLoaderData<typeof loader>();
  const [search] = useState("");
  const [searchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    status: searchParams.get("status") || "",
    search: searchParams.get("search") || "",
    limit: parseInt(searchParams.get("limit") || "10") || 10,
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
    if (users?.meta && pagination.limit < users?.meta?.totalData) {
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
      pathname: "/panel/users",
      search: `?${params.toString()}`,
    });
  }, [pagination]);

  return (
    <Flex direction="column" gap="sm">
      <Paper p="sm" radius="md">
        <Flex gap="sm">
          <Box>
            <Text size="xl" fw="bold">
              Users
            </Text>
            <Text c="gray.7" size="sm">
              Lihat dan atur Users yang ada pada aplikasi pemenangan kamu
            </Text>
          </Box>
          <Button
            style={{ flexShrink: 0 }}
            leftSection={<IconPlus size="20px" />}
            onClick={() => navigate("/panel/users/manage", { state: null })}
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
      </Paper>
      {users?.data.map((user) => {
        return <CardUser user={user} key={user.id} />;
      })}
      <Button
        leftSection={<IconRefresh />}
        variant="light"
        onClick={handleNextPage}
      >
        Muat Lebih Banyak
      </Button>
      <Outlet />
    </Flex>
  );
}

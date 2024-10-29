import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { IconPlus } from "@tabler/icons-react";
import CardUser from "~/components/organisms/card-user";
import { loader } from "~/routes/panel.users";

export default function UserPage() {
  const navigate = useNavigate();
  const { users } = useLoaderData<typeof loader>();

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
      {users?.data.map((user) => {
        return <CardUser user={user} key={user.id} />;
      })}
      <Outlet />
    </Flex>
  );
}

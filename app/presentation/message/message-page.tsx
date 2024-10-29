import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { IconPlus } from "@tabler/icons-react";
import CardMessage from "~/components/organisms/card-message";
// import { getMessageLoader } from "~/application/message";
import CardPesan from "~/components/organisms/card-message";
import { loader } from "~/routes/panel.message";

export default function MessagePage() {
  const { messages } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Flex direction="column" gap="sm">
      <Paper p="sm" radius="md">
        <Flex gap="sm" justify="space-between">
          <Box>
            <Text size="xl" fw="bold">
              Pesan
            </Text>
            <Text c="gray.7" size="sm">
              Tambah, Atur dan Lihat Pesan yang dikirimkan ke atasan
            </Text>
          </Box>
          <Button
            style={{ flexShrink: 0 }}
            leftSection={<IconPlus size="20px" />}
            onClick={() => navigate("/panel/message/manage")}
            color="greenBrand"
          >
            Buat
          </Button>
        </Flex>
      </Paper>

      {messages?.data.map((item) => {
        return <CardMessage key={item.id} message={item} />;
      })}
      <Outlet />
    </Flex>
  );
}

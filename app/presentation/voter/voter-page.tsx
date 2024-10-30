import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
// import { getDptLoader } from "~/application/dpt";
import { IconPlus } from "@tabler/icons-react";
import CardVoter from "~/components/organisms/card-voter";
import { Voter } from "~/domain";
import { loader } from "~/routes/panel.voter";

export default function VoterPage() {
  const { voters } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  console.log(voters);

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
    </Flex>
  );
}

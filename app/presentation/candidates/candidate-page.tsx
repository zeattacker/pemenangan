import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
// import { getDptLoader } from "~/application/dpt";
import { IconPlus } from "@tabler/icons-react";
import CardCandidate from "~/components/organisms/card-candidate";
import { loader } from "~/routes/panel.candidate";

export default function CandidatePage() {
  const candidates = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  //   const [activeDpt, setActiveDpt] = useState(null);

  return (
    <Flex direction="column" gap="sm">
      <Paper p="sm" radius="md">
        <Flex gap="sm">
          <Box>
            <Text size="xl" fw="bold">
              Kandidat
            </Text>
            <Text c="gray.7" size="sm">
              Lihat dan atur Kandidat yang ada pada aplikasi pemenangan kamu
            </Text>
          </Box>
          <Button
            style={{ flexShrink: 0 }}
            leftSection={<IconPlus size="20px" />}
            onClick={() => navigate("/panel/candidate/manage")}
            color="greenBrand"
          >
            Tambah
          </Button>
        </Flex>
      </Paper>
      {candidates.data.map((item) => {
        return <CardCandidate key={item.id} candidate={item} />;
      })}
      <Outlet />
    </Flex>
  );
}

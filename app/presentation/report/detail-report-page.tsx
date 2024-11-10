import { Divider, Flex, Group, Stack, Tabs, Text } from "@mantine/core";
import { useLoaderData, useParams } from "@remix-run/react";
import { loader } from "~/routes/panel.report.$tabValue";

export default function DetailReportPage() {
  const { tabValue } = useParams();
  const { voterReports } = useLoaderData<typeof loader>();

  console.log(voterReports);

  return (
    <Tabs.Panel value={tabValue!}>
      <Stack my="md">
        {voterReports?.data?.map((voter) => {
          return (
            <Flex direction="column" key={voter.id} gap="sm">
              <Group grow>
                <Flex direction="column">
                  <Text size="sm">Nama Kecamatan</Text>
                  <Text fw="bold">{voter.name}</Text>
                </Flex>
                <Flex direction="column">
                  <Text size="sm">Jumlah DPT</Text>
                  <Text fw="bold">{voter.voterCount}</Text>
                </Flex>
              </Group>
              <Stack ml="md">
                {voter.villages.map((village) => {
                  return (
                    <Flex direction="column" key={village.id} gap="sm">
                      <Group grow>
                        <Flex direction="column">
                          <Text size="sm">Nama Kelurahan</Text>
                          <Text fw="bold">{village.name}</Text>
                        </Flex>
                        <Flex direction="column">
                          <Text size="sm">Jumlah DPT</Text>
                          <Text fw="bold">
                            {village.voterCount.toLocaleString("id-ID", {
                              maximumFractionDigits: 0,
                            })}
                          </Text>
                        </Flex>
                      </Group>
                    </Flex>
                  );
                })}
              </Stack>
              <Divider />
            </Flex>
          );
        })}
      </Stack>
    </Tabs.Panel>
  );
}

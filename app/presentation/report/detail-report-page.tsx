import { Divider, Flex, Group, Stack, Tabs, Text } from "@mantine/core";
import { useLoaderData, useParams } from "@remix-run/react";
import { loader } from "~/routes/panel.report.$tabValue";

export default function DetailReportPage() {
  const { tabValue } = useParams();
  const { voterReports, recapReports } = useLoaderData<typeof loader>();

  return (
    <Tabs.Panel value={tabValue!}>
      {tabValue == "data" ? (
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
                    <Text fw="bold">
                      {voter.voterCount.toLocaleString("id-ID")}
                    </Text>
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
                              {parseInt(village.voterCount).toLocaleString(
                                "id-ID"
                              )}
                            </Text>
                          </Flex>
                        </Group>
                        <Stack ml="md">
                          {village.votingStations.map((votingStation) => {
                            return (
                              <Flex
                                direction="column"
                                key={votingStation.id}
                                gap="sm"
                              >
                                <Group grow>
                                  <Flex direction="column">
                                    <Text size="sm">Nama TPS</Text>
                                    <Text fw="bold">{votingStation.name}</Text>
                                  </Flex>
                                  <Flex direction="column">
                                    <Text size="sm">Jumlah DPT</Text>
                                    <Text fw="bold">
                                      {parseInt(
                                        votingStation.voterCount
                                      ).toLocaleString("id-ID")}
                                    </Text>
                                  </Flex>
                                </Group>
                              </Flex>
                            );
                          })}
                        </Stack>
                      </Flex>
                    );
                  })}
                </Stack>
                <Divider />
              </Flex>
            );
          })}
        </Stack>
      ) : (
        <Stack my="md">
          {recapReports?.map((recap) => {
            return (
              <Flex direction="column" key={recap.id} gap="sm">
                <Group grow>
                  <Flex direction="column">
                    <Text size="sm">Nama Pasangan</Text>
                    <Text fw="bold">
                      {recap.name} - {recap.viceName}
                    </Text>
                  </Flex>
                  <Flex direction="column">
                    <Text size="sm">Jumlah Suara</Text>
                    <Text fw="bold">
                      {recap.voteCount.toLocaleString("id-ID")}
                    </Text>
                  </Flex>
                </Group>
                <Stack ml="md">
                  {recap.districts[0].map((first) => {
                    return (
                      <Flex direction="column" key={first.id} gap="sm">
                        <Group grow>
                          <Flex direction="column">
                            <Text size="sm">Nama Kecamatan</Text>
                            <Text fw="bold">{first.name}</Text>
                          </Flex>
                          <Flex direction="column">
                            <Text size="sm">Jumlah Suara</Text>
                            <Text fw="bold">
                              {first.voteCount.toLocaleString("id-ID")}
                            </Text>
                          </Flex>
                        </Group>
                        <Stack ml="md">
                          {first.villages.map((second) => {
                            return (
                              <Flex direction="column" key={second.id} gap="sm">
                                <Group grow>
                                  <Flex direction="column">
                                    <Text size="sm">Nama Kelurahan</Text>
                                    <Text fw="bold">{second.name}</Text>
                                  </Flex>
                                  <Flex direction="column">
                                    <Text size="sm">Jumlah Suara</Text>
                                    <Text fw="bold">
                                      {second.voteCount.toLocaleString("id-ID")}
                                    </Text>
                                  </Flex>
                                </Group>
                              </Flex>
                            );
                          })}
                        </Stack>
                      </Flex>
                    );
                  })}
                </Stack>
                <Divider />
              </Flex>
            );
          })}
        </Stack>
      )}
    </Tabs.Panel>
  );
}

import { Flex, Paper, SimpleGrid, Text } from "@mantine/core";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  IconAdjustments,
  IconBuilding,
  IconBuildingEstate,
  IconChevronRight,
  IconPackage,
  IconUserCheck,
  IconUserEdit,
  IconUserHeart,
} from "@tabler/icons-react";
import { loader } from "~/routes/panel.dashboard";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, dashboardTop } = useLoaderData<typeof loader>();

  return (
    <Flex direction="column" gap="lg">
      <SimpleGrid cols={2}>
        {(user?.hasGroups.includes("Korcam") ||
          user?.hasGroups.includes("Korkel") ||
          user?.hasGroups.includes("Admin") ||
          user?.isAdmin) && (
          <>
            <Paper radius="md" p="md" style={{ cursor: "pointer" }}>
              <Flex
                gap="md"
                align="center"
                direction="row"
                justify="space-between"
                onClick={() => navigate("/panel/users")}
              >
                <Flex direction="column">
                  <Text size="sm" c="gray.8">
                    Total Saksi
                  </Text>
                  <Text size="40px" fw="bolder">
                    {(dashboardTop?.data?.saksiCount || 0).toLocaleString(
                      "id-ID"
                    )}
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  bg="blue.6"
                  p="sm"
                  style={{ borderRadius: "100%" }}
                >
                  <IconUserCheck
                    style={{ width: "20px", height: "20px" }}
                    stroke={1.5}
                    color="white"
                  />
                </Flex>
              </Flex>
            </Paper>
            <Paper radius="md" p="md" style={{ cursor: "pointer" }}>
              <Flex
                gap="md"
                align="center"
                direction="row"
                justify="space-between"
                onClick={() => navigate("/panel/users")}
              >
                <Flex direction="column">
                  <Text size="md" c="gray.8">
                    Saksi Terdaftar
                  </Text>
                  <Text size="40px" fw="bolder">
                    {(
                      dashboardTop?.data?.saksiRegisteredCount || 0
                    ).toLocaleString("id-ID")}
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  bg="green.6"
                  p="sm"
                  style={{ borderRadius: "100%" }}
                >
                  <IconUserCheck
                    style={{ width: "20px", height: "20px" }}
                    stroke={1.5}
                    color="white"
                  />
                </Flex>
              </Flex>
            </Paper>
            <Paper radius="md" p="md" style={{ cursor: "pointer" }}>
              <Flex
                gap="md"
                align="center"
                direction="row"
                justify="space-between"
                onClick={() => navigate("/panel/users")}
              >
                <Flex direction="column">
                  <Text size="sm" c="gray.8">
                    Total Relawan
                  </Text>
                  <Text size="40px" fw="bolder">
                    {(dashboardTop?.data?.relawanCount || 0).toLocaleString(
                      "id-ID"
                    )}
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  bg="blue.6"
                  p="sm"
                  style={{ borderRadius: "100%" }}
                >
                  <IconUserHeart
                    style={{ width: "20px", height: "20px" }}
                    stroke={1.5}
                    color="white"
                  />
                </Flex>
              </Flex>
            </Paper>
            <Paper radius="md" p="md" style={{ cursor: "pointer" }}>
              <Flex
                gap="md"
                align="center"
                direction="row"
                justify="space-between"
                onClick={() => navigate("/panel/users")}
              >
                <Flex direction="column">
                  <Text size="sm" c="gray.8">
                    Relawan Terdaftar
                  </Text>
                  <Text size="40px" fw="bolder">
                    {(
                      dashboardTop?.data?.relawanRegisteredCount || 0
                    ).toLocaleString("id-ID")}
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  bg="green.6"
                  p="sm"
                  style={{ borderRadius: "100%" }}
                >
                  <IconUserHeart
                    style={{ width: "20px", height: "20px" }}
                    stroke={1.5}
                    color="white"
                  />
                </Flex>
              </Flex>
            </Paper>
          </>
        )}
        {(user?.isAdmin || user?.hasGroups.includes("Relawan")) && (
          <>
            <Paper radius="md" p="md" style={{ cursor: "pointer" }}>
              <Flex
                gap="md"
                align="center"
                direction="row"
                justify="space-between"
                onClick={() => navigate("/panel/users")}
              >
                <Flex direction="column">
                  <Text size="md" c="gray.8">
                    Total DPT
                  </Text>
                  <Text size="40px" fw="bolder">
                    {(dashboardTop?.data?.voterCount || 0).toLocaleString(
                      "id-ID"
                    )}
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  bg="blue.6"
                  p="sm"
                  style={{ borderRadius: "100%" }}
                >
                  <IconUserEdit
                    style={{ width: "20px", height: "20px" }}
                    stroke={1.5}
                    color="white"
                  />
                </Flex>
              </Flex>
            </Paper>
            <Paper radius="md" p="md" style={{ cursor: "pointer" }}>
              <Flex
                gap="md"
                align="center"
                direction="row"
                justify="space-between"
                onClick={() => navigate("/panel/users")}
              >
                <Flex direction="column">
                  <Text size="sm" c="gray.8">
                    DPT Terdaftar
                  </Text>
                  <Text size="40px" fw="bolder">
                    {(
                      dashboardTop?.data?.voterRegisterdCount || 0
                    ).toLocaleString("id-ID")}
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  bg="green.6"
                  p="sm"
                  style={{ borderRadius: "100%" }}
                >
                  <IconUserEdit
                    style={{ width: "20px", height: "20px" }}
                    stroke={1.5}
                    color="white"
                  />
                </Flex>
              </Flex>
            </Paper>
          </>
        )}
      </SimpleGrid>
      <Text size="xl" fw="bold">
        Menu
      </Text>
      {/* Users */}
      <Paper radius="md" p="md" style={{ cursor: "pointer" }}>
        <Flex
          gap="md"
          align="center"
          direction="row"
          onClick={() => navigate("/panel/users")}
        >
          <Flex
            align="center"
            justify="center"
            bg="red.6"
            p="sm"
            style={{ borderRadius: "100%" }}
          >
            <IconAdjustments
              style={{ width: "30px", height: "30px" }}
              stroke={1.5}
              color="white"
            />
          </Flex>
          <Flex direction="column">
            <Text size="lg" fw="bold">
              Users
            </Text>
            <Text size="xs">
              Lihat dan atur user yang ada pada aplikasi pemenangan ini
            </Text>
          </Flex>
          <IconChevronRight
            style={{ width: "30px", height: "30px" }}
            stroke={1.5}
          />
        </Flex>
      </Paper>
      {user?.isAdmin && (
        <>
          {/* Kandidat */}
          <Paper radius="md" p="md" style={{ cursor: "pointer" }}>
            <Flex
              gap="md"
              align="center"
              direction="row"
              onClick={() => navigate("/panel/candidate")}
            >
              <Flex
                align="center"
                justify="center"
                bg="orange.6"
                p="sm"
                style={{ borderRadius: "100%" }}
              >
                <IconUserHeart
                  style={{ width: "30px", height: "30px" }}
                  stroke={1.5}
                  color="white"
                />
              </Flex>
              <Flex direction="column">
                <Text size="lg" fw="bold">
                  Kandidat
                </Text>
                <Text size="xs">
                  Lihat dan atur kandidat yang ada pada aplikasi pemenangan ini
                </Text>
              </Flex>
              <IconChevronRight
                style={{ width: "30px", height: "30px" }}
                stroke={1.5}
              />
            </Flex>
          </Paper>
          {/* TPS */}
          <Paper radius="md" p="md" style={{ cursor: "pointer" }}>
            <Flex
              gap="md"
              align="center"
              direction="row"
              onClick={() => navigate("/panel/tps")}
            >
              <Flex
                align="center"
                justify="center"
                bg="blue.6"
                p="sm"
                style={{ borderRadius: "100%" }}
              >
                <IconPackage
                  style={{ width: "30px", height: "30px" }}
                  stroke={1.5}
                  color="white"
                />
              </Flex>
              <Flex direction="column">
                <Text size="lg" fw="bold">
                  TPS
                </Text>
                <Text size="xs">
                  Lihat dan atur tps yang ada pada aplikasi pemenangan ini
                </Text>
              </Flex>
              <IconChevronRight
                style={{ width: "30px", height: "30px" }}
                stroke={1.5}
              />
            </Flex>
          </Paper>
          {/* Kecamatan */}
          <Paper radius="md" p="md" style={{ cursor: "pointer" }}>
            <Flex
              gap="md"
              align="center"
              direction="row"
              onClick={() => navigate("/panel/district")}
            >
              <Flex
                align="center"
                justify="center"
                bg="green.6"
                p="sm"
                style={{ borderRadius: "100%" }}
              >
                <IconBuildingEstate
                  style={{ width: "30px", height: "30px" }}
                  stroke={1.5}
                  color="white"
                />
              </Flex>
              <Flex direction="column">
                <Text size="lg" fw="bold">
                  Kecamatan
                </Text>
                <Text size="xs">
                  Lihat dan atur kecamatan yang ada pada aplikasi pemenangan ini
                </Text>
              </Flex>
              <IconChevronRight
                style={{ width: "30px", height: "30px" }}
                stroke={1.5}
              />
            </Flex>
          </Paper>
          {/* Kelurahan */}
          <Paper radius="md" p="md" style={{ cursor: "pointer" }}>
            <Flex
              gap="md"
              align="center"
              direction="row"
              onClick={() => navigate("/panel/village")}
            >
              <Flex
                align="center"
                justify="center"
                bg="cyan.6"
                p="sm"
                style={{ borderRadius: "100%" }}
              >
                <IconBuilding
                  style={{ width: "30px", height: "30px" }}
                  stroke={1.5}
                  color="white"
                />
              </Flex>
              <Flex direction="column">
                <Text size="lg" fw="bold">
                  Kelurahan
                </Text>
                <Text size="xs">
                  Lihat dan atur kelurahan yang ada pada aplikasi pemenangan ini
                </Text>
              </Flex>
              <IconChevronRight
                style={{ width: "30px", height: "30px" }}
                stroke={1.5}
              />
            </Flex>
          </Paper>
          {/* Lingkungan */}
          {/* <Paper radius="md" p="md" style={{ cursor: "pointer" }}>
            <Flex
              gap="md"
              align="center"
              direction="row"
              onClick={() => navigate("/panel/neighborhood")}
            >
              <Flex
                align="center"
                justify="center"
                bg="green.6"
                p="sm"
                style={{ borderRadius: "100%" }}
              >
                <IconHome
                  style={{ width: "30px", height: "30px" }}
                  stroke={1.5}
                  color="white"
                />
              </Flex>
              <Flex direction="column">
                <Text size="lg" fw="bold">
                  Lingkungan
                </Text>
                <Text size="xs">
                  Lihat dan atur lingkungan yang ada pada aplikasi pemenangan
                  ini
                </Text>
              </Flex>
              <IconChevronRight
                style={{ width: "30px", height: "30px" }}
                stroke={1.5}
              />
            </Flex>
          </Paper> */}
        </>
      )}
    </Flex>
  );
}

import { Box, Container, Flex, Grid, Text } from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import {
  IconBroadcast,
  IconDashboard,
  IconMessage,
  IconReport,
  IconReportAnalytics,
  IconUserCircle,
  IconUserEdit,
  IconWriting,
} from "@tabler/icons-react";
import { validateUser } from "~/adapter/controllers/auth.server";
import { User } from "~/domain/entities/user.entity";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = (await validateUser(request)) as User | null;

  if (!user) {
    return redirect("/");
  }
  return json({ user });
}

export default function PanelLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useLoaderData<typeof loader>();

  return (
    <Box mih="100vh" p={0}>
      <Box bg="greenBrand.6" p="md">
        <Container size="xs">
          <Text size="24px" c="white" fw="bolder">
            E-Pemenangan
          </Text>
        </Container>
      </Box>
      <Container size="xs" mih="calc(100vh - 56px)" px={0} py={8}>
        <Box mb="66px">
          <Outlet />
        </Box>
        <Flex
          bg="white"
          mah="66px"
          py="xs"
          bottom={0}
          pos="fixed"
          align="stretch"
          direction="column"
          maw="480px"
          w="100%"
          style={{
            borderTop: "2px solid #ececec",
            borderRadius: "8px 8px 0px 0px",
          }}
        >
          <Grid w="100%" align="stretch" ta="center">
            {(!["Saksi", "Relawan"].includes(user?.hasGroups[0]) ||
              user?.isAdmin) && (
              <Grid.Col
                span="auto"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/panel/dashboard")}
              >
                <IconDashboard
                  size="26px"
                  color={
                    location.pathname == "/panel/dashboard" ? "green" : "gray"
                  }
                />
                <Text size="xs" c="gray.7">
                  Dashboard
                </Text>
              </Grid.Col>
            )}
            {(["Relawan", "Korcam", "Korkel", "Admin"].includes(
              user?.hasGroups[0]
            ) ||
              user?.isAdmin) && (
              <Grid.Col
                span="auto"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/panel/voter")}
              >
                <IconUserEdit
                  size="26px"
                  color={location.pathname == "/panel/voter" ? "green" : "gray"}
                />
                <Text size="xs" c="gray.7">
                  DPT
                </Text>
              </Grid.Col>
            )}
            {(["Saksi", "Korcam", "Korkel", "Admin"].includes(
              user?.hasGroups[0]
            ) ||
              user?.isAdmin) && (
              <Grid.Col
                span="auto"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/panel/recap")}
              >
                <IconWriting
                  size="26px"
                  color={location.pathname == "/panel/recap" ? "green" : "gray"}
                />
                <Text size="xs" c="gray.7">
                  Rekap
                </Text>
              </Grid.Col>
            )}
            {user?.isAdmin && (
              <Grid.Col
                span="auto"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/panel/report/data")}
              >
                <IconReportAnalytics
                  size="26px"
                  color={
                    location.pathname == "/panel/report/data" ? "green" : "gray"
                  }
                />
                <Text size="xs" c="gray.7">
                  Laporan
                </Text>
              </Grid.Col>
            )}
            {/* <Grid.Col
              span="auto"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/panel/broadcast")}
            >
              <IconBroadcast
                size="26px"
                color={
                  location.pathname == "/panel/broadcast" ? "green" : "gray"
                }
              />
              <Text size="xs" c="gray.7">
                Broadcast
              </Text>
            </Grid.Col> */}
            <Grid.Col
              span="auto"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/panel/profile")}
            >
              <IconUserCircle
                size="26px"
                color={location.pathname == "/panel/profile" ? "green" : "gray"}
              />
              <Text size="xs" c="gray.7">
                Profile
              </Text>
            </Grid.Col>
          </Grid>
        </Flex>
      </Container>
    </Box>
  );
}

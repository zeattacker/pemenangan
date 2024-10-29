import { Box, Container, Text } from "@mantine/core";
import { Outlet } from "@remix-run/react";

export default function AppLayout() {
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
        <Outlet />
      </Container>
    </Box>
  );
}

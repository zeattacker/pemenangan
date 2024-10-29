import { Button, Flex, Paper, Text, Title } from "@mantine/core";
import { IconCircleCheck, IconLogin2 } from "@tabler/icons-react";

export default function RegisterCompletePage() {
  return (
    <Flex direction="column" gap="md">
      <Paper p="lg" radius="md">
        <Flex direction="column" align="center" justify="center">
          <IconCircleCheck
            size="125px"
            color="var(--mantine-color-green-filled)"
          />
          <Title mt="lg">Registrasi Berhasil</Title>
          <Text ta="center" mt="md">
            Pendaftaran anda sudah masuk, anda akan menerima notifikasi berupa
            email ketika sudah dikonfirmasi oleh koordinator terkait.
          </Text>
          <Button
            leftSection={<IconLogin2 />}
            mt="xl"
            color="greenBrand"
            component="a"
            href="/"
          >
            Kembali ke Halaman Login
          </Button>
        </Flex>
      </Paper>
    </Flex>
  );
}

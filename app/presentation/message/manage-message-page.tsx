import { Button, Drawer, Flex, Textarea, TextInput } from "@mantine/core";
import { useNavigate, useNavigation, useParams } from "@remix-run/react";
import drawerClasses from "~/styles/drawer.module.css";
import { DatePickerInput } from "@mantine/dates";
import CustomFileInput from "~/components/atoms/CustomFileInput";

export default function ManageMessagePage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { id } = useParams();

  return (
    <Drawer.Root
      opened
      onClose={() => navigate(-1)}
      position="bottom"
      radius="md"
      style={{ height: "auto !important" }}
      classNames={drawerClasses}
      withinPortal={false}
    >
      <Drawer.Overlay />
      <Drawer.Content h="auto">
        <Drawer.Header>
          <Drawer.Title fw={600}>{id ? "Ubah" : "Buat"} Pesan</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Flex direction="column" gap="xs">
            <TextInput label="Judul" placeholder="Cth : Judul Pesan" />
            <Textarea label="Pesan" rows={4} placeholder="Cth : Isi Pesan" />
            <CustomFileInput />
            <Button>Tambah DPT</Button>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

import { Button, Drawer, Flex, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";
import { action } from "~/routes/panel.broadcast.manage.($id)";
import drawerClasses from "~/styles/drawer.module.css";

export default function ManageBroadcastPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const { id } = useParams();
  const isSubmitting = navigation.state == "submitting";
  const isOpen = location.pathname.includes("/panel/broadcast/manage");
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        notifications.show({
          title: "Berhasil!",
          message: `${actionData.data?.title} berhasil ${
            id ? "diubah" : "ditambahkan"
          } sebagai Kandidat`,
          color: "green",
          position: "top-center",
        });
        navigate("/panel/broadcast");
      } else {
        notifications.show({
          title: "Ooops...",
          message: `Gagal ${id ? "mengubah" : "menambahkan"} Kandidat`,
          color: "red",
          position: "top-center",
        });
      }
    }
  }, [actionData, navigate, id]);

  return (
    <Drawer.Root
      opened={isOpen}
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
          <Drawer.Title fw={600}>{id ? "Ubah" : "Buat"} Broadcast</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Flex direction="column" gap="xs">
            <TextInput
              label="Judul"
              placeholder="Cth : Pemberitahuan Awal"
              key={form.key("title")}
              {...form.getInputProps("title")}
            />
            <Textarea
              label="Deskripsi"
              rows={6}
              placeholder="Cth: Ini adalah pemberitahuan untuk semua saksi dan relawan"
              key={form.key("description")}
              {...form.getInputProps("description")}
            />
            <Button
              type="submit"
              loading={isSubmitting}
              onClick={() => submit(form.getValues(), { method: "POST" })}
            >
              Tambah Broadcast
            </Button>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

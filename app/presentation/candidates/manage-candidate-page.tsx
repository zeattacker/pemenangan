import { Button, Drawer, Flex, TextInput } from "@mantine/core";
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
import { action } from "~/routes/panel.district.manage.($id)";
import drawerClasses from "~/styles/drawer.module.css";

export default function ManageCandidatePage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const { id } = useParams();
  const submit = useSubmit();
  const isSubmitting = navigation.state == "submitting";
  const isOpen = location.pathname.includes("/panel/candidate/manage");
  // const { district } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const candidate = location.state;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: candidate ? candidate.name : "",
      viceName: candidate ? candidate.viceName : "",
      id: candidate ? candidate.id : "",
    },
  });

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        notifications.show({
          title: "Berhasil!",
          message: `${actionData.data?.name} berhasil ${
            id ? "diubah" : "ditambahkan"
          } sebagai Kandidat`,
          color: "green",
          position: "top-center",
        });
        navigate("/panel/candidate");
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
      transitionProps={{
        transition: "slide-up",
        duration: 150,
        timingFunction: "linear",
      }}
    >
      <Drawer.Overlay />
      <Drawer.Content h="auto">
        <Drawer.Header>
          <Drawer.Title fw={600}>
            {id ? "Ubah" : "Tambah"} Kandidat
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Flex direction="column" gap="xs">
            <TextInput
              type="hidden"
              key={form.key("id")}
              {...form.getInputProps("id")}
            />
            <TextInput
              label="Nama Calon"
              placeholder="Cth : Ahmad Sudrajat"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Nama Wakil Calon"
              key={form.key("viceName")}
              placeholder="Cth : Tejo Sudrajat"
              {...form.getInputProps("viceName")}
            />
            <Button
              type="submit"
              loading={isSubmitting}
              onClick={() => submit(form.getValues(), { method: "POST" })}
            >
              {id ? "Ubah" : "Tambah"} Kandidat
            </Button>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

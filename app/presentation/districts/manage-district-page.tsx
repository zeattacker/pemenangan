import { Button, Drawer, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit
} from "@remix-run/react";
import { useEffect } from "react";
import { action } from "~/routes/panel.district.manage.($id)";
import drawerClasses from "~/styles/drawer.module.css";

export default function ManageDistrictPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const { id } = useParams();
  const submit = useSubmit();
  const isSubmitting = navigation.state == "submitting";
  const isOpen = location.pathname.includes("/panel/district/manage");
  // const { district } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const district = location.state;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: district ? district.name : "",
      cityOrRegencyId: 1,
      id: district ? district.id : "",
    },
  });

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        notifications.show({
          title: "Berhasil!",
          message: `${actionData.data?.name} berhasil ${
            id ? "diubah" : "ditambahkan"
          } sebagai Kecamatan`,
          color: "green",
          position: "top-center",
        });
        navigate("/panel/district");
      } else {
        notifications.show({
          title: "Ooops...",
          message: `Gagal ${id ? "mengubah" : "menambahkan"} Kecamatan`,
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
            {id ? "Ubah" : "Tambah"} Kecamatan
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Flex direction="column" gap="xs">
            <TextInput
              type="hidden"
              key={form.key("cityOrRegencyId")}
              {...form.getInputProps("cityOrRegencyId")}
            />
            <TextInput
              type="hidden"
              key={form.key("id")}
              {...form.getInputProps("id")}
            />
            <TextInput
              label="Nama Kecamatan"
              key={form.key("name")}
              placeholder="Cth : Magersari"
              {...form.getInputProps("name")}
            />
            <Button
              type="submit"
              loading={isSubmitting}
              onClick={() => submit(form.getValues(), { method: "POST" })}
            >
              {id ? "Ubah" : "Tambah"} Kecamatan
            </Button>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

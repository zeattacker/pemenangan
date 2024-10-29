import {
  Button,
  ComboboxData,
  Drawer,
  Flex,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";
import { Village } from "~/domain";
import { action, loader } from "~/routes/panel.village.manage.($id)";
import drawerClasses from "~/styles/drawer.module.css";

export default function ManageVillagePage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const { id } = useParams();
  const submit = useSubmit();
  const isSubmitting = navigation.state == "submitting";
  const isOpen = location.pathname.includes("/panel/village/manage");
  const village = location.state as Village;
  const { districts } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: village ? village.name : "",
      districtId: village ? village.district.id : "",
      id: village ? village.id : "",
    },
  });

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        notifications.show({
          title: "Berhasil!",
          message: `${actionData.data?.name} berhasil ${
            id ? "diubah" : "ditambahkan"
          } sebagai Kelurahan`,
          color: "green",
          position: "top-center",
        });
        navigate("/panel/village");
      } else {
        notifications.show({
          title: "Ooops...",
          message: `Gagal ${id ? "mengubah" : "menambahkan"} Kelurahan`,
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
            {id ? "Ubah" : "Tambah"} Kelurahan
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
            <Select
              label="Kecamatan"
              placeholder="Pilih Kecamatan"
              data={(districts?.data as ComboboxData) || []}
              searchable
              key={form.key("districtId")}
              value={form.getValues().districtId.toString()}
              onChange={(value) =>
                form.setFieldValue("districtId", value || "")
              }
            />
            <TextInput
              label="Nama Kelurahan"
              key={form.key("name")}
              placeholder="Cth : Magersari"
              {...form.getInputProps("name")}
            />
            <Button
              type="submit"
              loading={isSubmitting}
              onClick={() => submit(form.getValues(), { method: "POST" })}
            >
              {id ? "Ubah" : "Tambah"} Kelurahan
            </Button>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

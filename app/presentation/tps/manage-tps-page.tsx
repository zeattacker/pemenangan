import { Button, Drawer, Flex, Select, TextInput } from "@mantine/core";
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
import { AreaSelect } from "~/components/atoms/AreaSelect";
import { action, loader } from "~/routes/panel.tps.manage.($id)";
import drawerClasses from "~/styles/drawer.module.css";

export default function ManageTpsPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const { id } = useParams();
  const submit = useSubmit();
  const isSubmitting = navigation.state == "submitting";
  const isOpen = location.pathname.includes("/panel/tps/manage");
  const { districts, tps } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: tps ? tps.data.name : "",
      districtId: tps ? tps.data.village.district.id.toString() : "", //TODO : Butuh districtId di object village
      villageId: tps ? tps.data.village.id.toString() : "",
      id: tps ? tps.data.id : "",
    },
  });

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        notifications.show({
          title: "Berhasil!",
          message: `${actionData.data?.name} berhasil ditambahkan sebagai TPS`,
          color: "green",
          position: "top-center",
        });
        navigate("/panel/tps");
      } else {
        notifications.show({
          title: "Ooops...",
          message: `Gagal menambahkan TPS`,
          color: "red",
          position: "top-center",
        });
      }
    }
  }, [actionData, navigate]);

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
          <Drawer.Title fw={600}>{id ? "Ubah" : "Tambah"} DPT</Drawer.Title>
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
              label="Nama TPS"
              key={form.key("name")}
              placeholder="Cth : 001"
              {...form.getInputProps("name")}
            />
            <Select
              label="Kecamatan"
              placeholder="Pilih kecamatan"
              data={districts?.data || []}
              searchable
              key={form.key("districtId")}
              value={form.getValues().districtId}
              onChange={(value) =>
                form.setValues({
                  districtId: value!,
                  villageId: "",
                })
              }
            />
            <AreaSelect
              name="kelurahanId"
              label="Kelurahan"
              placeholder="Pilih Kelurahan"
              area="villages"
              value={form.getValues().villageId}
              queryId={form.getValues().districtId}
              key={form.key("villageId")}
              onChange={(value) =>
                form.setValues({
                  villageId: value!,
                })
              }
            />
            <Button
              type="submit"
              loading={isSubmitting}
              onClick={() => submit(form.getValues(), { method: "POST" })}
            >
              {id ? "Ubah" : "Tambah"} DPT
            </Button>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

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
import { useEffect, useState } from "react";
import { AreaSelect } from "~/components/atoms/AreaSelect";
import { Neighborhood } from "~/domain";
import { loader } from "~/routes/panel.neighborhood";
import { action } from "~/routes/panel.neighborhood.manage.($id)";
import drawerClasses from "~/styles/drawer.module.css";

export default function ManageNeighborhoodPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const { id } = useParams();
  const submit = useSubmit();
  const isSubmitting = navigation.state == "submitting";
  const isOpen = location.pathname.includes("/panel/neighborhood/manage");
  const neighborhood = location.state as Neighborhood;
  const [districtId, setDistrictId] = useState("");
  const { districts } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: neighborhood ? neighborhood.name : "",
      villageId: neighborhood ? neighborhood.villageId : "",
      id: neighborhood ? neighborhood.id : "",
      rt: neighborhood ? neighborhood.rt : "",
      rw: neighborhood ? neighborhood.rw : "",
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
        navigate("/panel/neighborhood");
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
            {id ? "Ubah" : "Tambah"} Lingkungan
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
              value={districtId}
              onChange={(value) => setDistrictId(value || "")}
            />
            <AreaSelect
              name="kelurahanId"
              label="Kelurahan"
              placeholder="Pilih Kelurahan"
              area="villages"
              value={form.getValues().villageId.toString()}
              queryId={districtId}
              key={form.key("villageId")}
              onChange={(value) => form.setFieldValue("villageId", value!)}
            />
            <TextInput
              label="Nama Lingkungan"
              key={form.key("name")}
              placeholder="Cth : Magersari"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="RT"
              key={form.key("rt")}
              placeholder="Cth : 001"
              {...form.getInputProps("rt")}
            />
            <TextInput
              label="RW"
              key={form.key("rw")}
              placeholder="Cth : 002"
              {...form.getInputProps("rw")}
            />
            <Button
              type="submit"
              loading={isSubmitting}
              onClick={() => submit(form.getValues(), { method: "POST" })}
            >
              {id ? "Ubah" : "Tambah"} Lingkungan
            </Button>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

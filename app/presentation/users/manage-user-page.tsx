import {
  Button,
  ComboboxData,
  Drawer,
  Flex,
  SegmentedControl,
  Select,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";
import { AreaSelect } from "~/components/atoms/AreaSelect";
import { User } from "~/domain/entities/user.entity";
import { action, loader } from "~/routes/panel.users.manage.($id)";
import drawerClasses from "~/styles/drawer.module.css";

export default function ManageUserPage() {
  const navigate = useNavigate();
  const { districts, user: activeUser } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { id } = useParams();
  const location = useLocation();
  const user = location.state as User;
  const submit = useSubmit();
  const roles = [
    { label: "Korcam", value: "Korcam" },
    { label: "Korkel", value: "Korkel" },
    { label: "Relawan", value: "Relawan" },
    { label: "Saksi", value: "Saksi" },
  ];
  let group = "Korcam";
  if (activeUser?.hasGroups.includes("Korcam")) {
    roles.splice(0, 1);
    group = "Korkel";
  }
  if (activeUser?.hasGroups.includes("Korkel")) {
    roles.splice(0, 2);
    group = "Relawan";
  }

  // console.log(user ? user.id : "a", activeUser);
  // return <></>;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      id: user ? user.id : "",
      username: user ? user.username : "",
      fullname: user?.userExtend ? user?.userExtend?.fullName : "",
      phoneNumber: user?.userExtend ? user?.userExtend?.phoneNumber : "",
      password: "",
      districtId: user?.district
        ? user.district.id.toString()
        : activeUser?.isAdmin
        ? ""
        : activeUser?.district?.id.toString(),
      villageId: user?.village
        ? user.village.id.toString()
        : activeUser?.isAdmin
        ? ""
        : activeUser?.hasGroups.includes("Korcam")
        ? ""
        : activeUser?.village.id.toString(),
      neighborhoodId: user?.neighborhood ? user.neighborhood.id.toString() : "",
      tpsId: user?.votingStations ? user.votingStations.id.toString() : "",
      isActive: user ? user.isActive : false,
      group: user?.hasGroups ? user?.hasGroups[0] : group,
    },
  });
  const isOpen = location.pathname.includes("/panel/users/manage");

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        notifications.show({
          title: "Berhasil!",
          message: `${actionData.data?.userExtend?.fullName} berhasil ${
            id ? "diubah" : "ditambahkan"
          } sebagai User`,
          color: "green",
          position: "top-center",
        });
        navigate("/panel/users");
      } else {
        notifications.show({
          title: "Ooops...",
          message: `Gagal ${id ? "mengubah" : "menambahkan"} User`,
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
          <Drawer.Title fw={600}>{id ? "Ubah" : "Tambah"} User</Drawer.Title>
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
              w="100%"
              label="Nama Lengkap"
              placeholder="Cth: Wasis Sapto"
              radius="xl"
              key={form.key("fullname")}
              {...form.getInputProps("fullname")}
            />
            <Flex gap="sm">
              <TextInput
                w="100%"
                label="Username"
                placeholder="Cth: username"
                radius="xl"
                key={form.key("username")}
                {...form.getInputProps("username")}
              />
              <TextInput
                w="100%"
                label="No. Handphone"
                placeholder="Cth: 6283808921094"
                radius="xl"
                key={form.key("phoneNumber")}
                {...form.getInputProps("phoneNumber")}
              />
            </Flex>
            <TextInput
              label="Password"
              placeholder="Cth: *******"
              radius="xl"
              description="Password minimal 6 karakter"
              type="password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Flex gap="sm">
              <Select
                w="100%"
                label="Kecamatan"
                placeholder="Pilih kecamatan"
                data={(districts?.data as ComboboxData) || []}
                searchable
                key={form.key("districtId")}
                disabled={!activeUser?.isAdmin}
                value={form.getValues().districtId}
                onChange={(value) =>
                  form.setValues({
                    districtId: value!,
                    villageId: "",
                    tpsId: "",
                  })
                }
              />
              {form.getValues().group !== "Korcam" && (
                <AreaSelect
                  w="100%"
                  name="kelurahanId"
                  label="Kelurahan"
                  placeholder="Pilih Kelurahan"
                  area="villages"
                  value={form.getValues().villageId}
                  queryId={form.getValues().districtId || ""}
                  disabled={activeUser?.hasGroups.includes("Korkel")}
                  key={form.key("villageId")}
                  onChange={(value) =>
                    form.setValues({
                      villageId: value!,
                      neighborhoodId: "",
                      tpsId: "",
                    })
                  }
                />
              )}
            </Flex>
            <Flex gap="sm">
              {form.getValues().group == "Saksi" && (
                <AreaSelect
                  w="100%"
                  name="tps"
                  label="TPS"
                  placeholder="Pilih TPS"
                  area="tps"
                  value={form.getValues().neighborhoodId}
                  queryId={form.getValues().villageId || ""}
                  key={form.key("tpsId")}
                  onChange={(value) => form.setFieldValue("tpsId", value!)}
                />
              )}
            </Flex>
            <Flex direction="column" gap="4px">
              <Text fw={500} size="sm">
                Daftar Sebagai
              </Text>
              <SegmentedControl
                disabled={id ? true : false}
                color="greenBrand"
                data={roles}
                value={form.getValues().group}
                onChange={(value) => form.setFieldValue("group", value)}
              />
            </Flex>
            <Text fw={500} size="sm">
              Status User
            </Text>
            <Switch
              checked={form.getValues().isActive}
              onChange={(event) =>
                form.setFieldValue("isActive", event.currentTarget.checked)
              }
              label={form.getValues().isActive ? "Ya" : "Tidak"}
            />
            <Flex gap="md" mt="md">
              <Button
                fullWidth
                variant="transparent"
                color="dark"
                onClick={() => navigate(-1)}
              >
                Batalkan
              </Button>
              <Button
                fullWidth
                color="green"
                onClick={() => submit(form.getValues(), { method: "POST" })}
              >
                Ya, {id ? "Ubah" : "Tambah"}
              </Button>
            </Flex>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

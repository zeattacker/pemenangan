import { Button, Drawer, Flex, TextInput } from "@mantine/core";
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
import { DptSelect } from "~/components/atoms/DptSelect";
import { action, loader } from "~/routes/panel.voter.manage.($id)";
import drawerClasses from "~/styles/drawer.module.css";

export default function ManageVoterPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const actionData = useActionData<typeof action>();
  const { dpt } = useLoaderData<typeof loader>();
  const { id } = useParams();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      nik: "",
      dptId: "",
    },
  });
  const submit = useSubmit();
  const isSubmitting = navigation.state == "submitting";
  const isOpen = location.pathname.includes("/panel/voter/manage");
  const [item, setItem] = useState<string>();

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        notifications.show({
          title: "Berhasil!",
          message: `${actionData.data?.dpt?.name} berhasil ditambahkan sebagai DPT`,
          color: "green",
          position: "top-center",
        });
        navigate("/panel/voter");
      } else {
        notifications.show({
          title: "Ooops...",
          message: `Gagal menambahkan DPT`,
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
            <DptSelect
              value={form.getValues().dptId}
              onChange={(value) => form.setFieldValue("dptId", value || "")}
            />
            <TextInput
              label="NIK"
              description="Wajib sesuai KTP"
              key={form.key("nik")}
              placeholder="Cth : 3571293092030003"
              {...form.getInputProps("nik")}
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

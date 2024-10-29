import {
  Button,
  Flex,
  Group,
  Paper,
  SegmentedControl,
  Select,
  Stepper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "@remix-run/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { AreaSelect } from "~/components/atoms/AreaSelect";
import { action, loader } from "~/routes/_app.register";

export default function RegisterPage() {
  const { districts } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const submit = useSubmit();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullName: "",
      phoneNumber: "",
      username: "",
      email: "",
      group: "Relawan",
      districtId: "",
      villageId: "",
      neighborhoodId: "",
      tpsId: "",
    },
  });

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        notifications.show({
          title: "Pendaftaran Berhasil!",
          message: "Mohon tunggu koordinator memeverifikasi pendaftaran anda",
          color: "green",
          position: "top-center",
        });
        navigate("/register_finish");
      } else {
        notifications.show({
          title: "Pendaftaran Gagal",
          message:
            "Sepertinya akun anda sudah terdaftar, atau periksa kembali data diri anda",
          color: "red",
          position: "top-center",
        });
      }
    }
  }, [actionData, navigate]);

  return (
    <Flex direction="column" gap="md">
      <Paper p="lg">
        <Title size="24px">Daftar Menjadi Tim Sekarang!</Title>
        {/* <form
        > */}
        <Flex direction="column" gap="md" mt="lg">
          <Stepper iconSize={32} active={active} color="greenBrand">
            <Stepper.Step label="Step 1" description="Data Diri">
              <Flex direction="column" gap="sm">
                <TextInput
                  label="Nama Lengkap"
                  placeholder="Cth: Wasis Sapto Adikempro"
                  radius="xl"
                  key={form.key("fullName")}
                  {...form.getInputProps("fullName")}
                />
                <TextInput
                  label="No. Handphone"
                  leftSectionPointerEvents="none"
                  leftSection="+62"
                  leftSectionWidth={50}
                  placeholder="Cth: 8213456789"
                  radius="xl"
                  key={form.key("phoneNumber")}
                  {...form.getInputProps("phoneNumber")}
                />
                <TextInput
                  label="Email"
                  placeholder="Cth: wasissapto"
                  radius="xl"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />
                <TextInput
                  label="Username"
                  placeholder="Cth: username"
                  radius="xl"
                  key={form.key("username")}
                  {...form.getInputProps("username")}
                />
                <TextInput
                  label="Password"
                  placeholder="Cth: *******"
                  radius="xl"
                  type="password"
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                />
              </Flex>
            </Stepper.Step>
            <Stepper.Step label="Step 2" description="Data Wilayah">
              <Flex direction="column" gap="sm">
                <Flex direction="column" gap="4px">
                  <Text fw={500} size="sm">
                    Daftar Sebagai
                  </Text>
                  <SegmentedControl
                    // value={value}
                    // onChange={setValue}
                    color="greenBrand"
                    data={[
                      { label: "Relawan", value: "Relawan" },
                      { label: "Saksi", value: "Saksi" },
                    ]}
                    key={form.key("group")}
                    {...form.getInputProps("group")}
                  />
                </Flex>
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
                      neighborhoodId: "",
                      tpsId: "",
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
                      neighborhoodId: "",
                      tpsId: "",
                    })
                  }
                />
                <AreaSelect
                  name="neighborhood"
                  label="Lingkungan"
                  placeholder="Pilih Lingkungan"
                  area="neighborhoods"
                  value={form.getValues().neighborhoodId}
                  queryId={form.getValues().villageId}
                  key={form.key("neighborhoodId")}
                  onChange={(value) =>
                    form.setValues({
                      neighborhoodId: value!,
                    })
                  }
                />
              </Flex>
            </Stepper.Step>
          </Stepper>

          <Group justify="space-between" mt="xl">
            <Button
              color="greenBrand"
              type="button"
              onClick={active == 0 ? () => navigate("/") : prevStep}
              variant="outline"
              size="xs"
              leftSection={<IconChevronLeft size="14" />}
            >
              {active == 0 ? "Login" : "Kembali"}
            </Button>
            {active == 0 ? (
              <Button
                color="greenBrand"
                type="button"
                onClick={nextStep}
                size="xs"
                rightSection={<IconChevronRight size="14" />}
              >
                Selanjutnya
              </Button>
            ) : (
              <Button
                color="greenBrand"
                type="submit"
                size="xs"
                onClick={() => submit(form.getValues(), { method: "POST" })}
                rightSection={<IconChevronRight size="14" />}
              >
                Daftar
              </Button>
            )}
          </Group>
        </Flex>
        {/* </form> */}
      </Paper>
    </Flex>
  );
}

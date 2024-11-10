import {
  Button,
  ComboboxData,
  Drawer,
  Flex,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { AreaSelect } from "~/components/atoms/AreaSelect";
import { loader } from "~/routes/panel.recap.manage.($id)";
import drawerClasses from "~/styles/drawer.module.css";

export default function ManageRecapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = location.pathname.includes("/panel/recap/manage");
  const { id } = useParams();
  const { districts, candidates } = useLoaderData<typeof loader>();

  const form = useForm();
  const submit = useSubmit();

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
            {id ? "Ubah" : "Tambah"} Rekapitulasi
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Flex direction="column" gap="xs">
            <Select
              label="Kecamatan"
              placeholder="Pilih kecamatan"
              data={(districts?.data as ComboboxData) || []}
              searchable
              key={form.key("districtId")}
              value={form.getValues().districtId}
              onChange={(value) => {
                if (value !== form.getValues().districtId) {
                  form.setValues({
                    villageId: "",
                    neighborhoodId: "",
                    tpsId: "",
                  });
                }

                form.setFieldValue("districtId", value!);
              }}
            />
            <AreaSelect
              name="kelurahanId"
              label="Kelurahan"
              placeholder="Pilih Kelurahan"
              area="villages"
              value={form.getValues().villageId}
              queryId={form.getValues().districtId}
              key={form.key("villageId")}
              onChange={(value) => {
                if (value !== form.getValues().villageId) {
                  form.setValues({
                    neighborhoodId: "",
                    tpsId: "",
                  });
                }

                form.setFieldValue("villageId", value!);
              }}
            />
            <AreaSelect
              name="tps"
              label="TPS"
              placeholder="Pilih TPS"
              area="tps"
              value={form.getValues().tpsId}
              queryId={form.getValues().villageId}
              key={form.key("tpsId")}
              onChange={(value) =>
                form.setValues({
                  tpsId: value!,
                })
              }
            />
            <Select
              label="Kandidat"
              placeholder="Pilih kandidat"
              data={(candidates?.data as ComboboxData) || []}
              searchable
              key={form.key("candidateId")}
              value={form.getValues().candidateId}
              onChange={(value) => {
                form.setFieldValue("candidateId", value!);
              }}
            />
            <TextInput label="Suara Sah" />
            <TextInput label="Suara Tidak Sah" />
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

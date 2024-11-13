import {
  Button,
  ComboboxData,
  ComboboxItem,
  Drawer,
  Flex,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  useActionData,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";
import { AreaSelect } from "~/components/atoms/AreaSelect";
import { action, loader } from "~/routes/panel.recap.manage.($id)";
import drawerClasses from "~/styles/drawer.module.css";

export default function ManageRecapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const submit = useSubmit();
  const isOpen = location.pathname.includes("/panel/recap/manage");
  const { id } = useParams();
  const { districts, candidates } = useLoaderData<typeof loader>();
  const recap = location.state;
  const actionData = useActionData<typeof action>();

  const form = useForm({
    initialValues: {
      districtId: "",
      villageId: "",
      votingStationId: recap ? recap.id : "",
      candidates: recap
        ? recap.candidates
        : (candidates?.data as ComboboxItem[])?.map((item) => {
            return {
              candidateId: item.value,
              validVote: "",
            };
          }),
      invalidVote: recap ? recap.invalidVote : "",
    },
  });

  const onSubmit = async (e) => {
    submit(form.getTransformedValues(), {
      method: "POST",
      encType: "application/json",
    });
  };

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        notifications.show({
          title: "Berhasil!",
          message: `Rekapitulasi berhasil ${id ? "diubah" : "ditambahkan"}`,
          color: "green",
          position: "top-center",
        });
        navigate("/panel/recap");
      } else {
        notifications.show({
          title: "Ooops...",
          message: `Gagal ${id ? "mengubah" : "menambahkan"} Rekapitulasi`,
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
            {id ? "Ubah" : "Tambah"} Rekapitulasi
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Flex direction="column" gap="xs">
            {!id && (
              <>
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
                        votingStationId: "",
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
                      form.setFieldValue("votingStationId", "");
                    }

                    form.setFieldValue("villageId", value!);
                  }}
                />
                <AreaSelect
                  name="tps"
                  label="TPS"
                  placeholder="Pilih TPS"
                  area="tps"
                  value={form.getValues().votingStationId}
                  queryId={form.getValues().villageId}
                  key={form.key("votingStationId")}
                  onChange={(value) =>
                    form.setFieldValue("votingStationId", value!)
                  }
                />
              </>
            )}
            {(candidates?.data as ComboboxItem[])?.map(
              (item: ComboboxItem, index: number) => {
                return (
                  <TextInput
                    label={`Suara Sah ${item.label}`}
                    key={form.getValues().candidates[index].candidateId}
                    placeholder="Cth: 100"
                    name="candidates[]"
                    value={form.getValues().candidates[index].validVote}
                    onChange={(e) => {
                      form.removeListItem("candidates", index);
                      form.insertListItem(
                        "candidates",
                        {
                          candidateId: item.value,
                          validVote: e.target.value,
                        },
                        index
                      );
                    }}
                  />
                );
              }
            )}

            <TextInput
              label="Suara Tidak Sah"
              key={form.key("invalidVote")}
              name="invalidVote"
              placeholder="Cth: 100"
              value={form.getValues().invalidVote}
              onChange={(e) =>
                form.setFieldValue("invalidVote", e.target.value)
              }
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
              <Button fullWidth color="green" onClick={onSubmit}>
                Ya, {id ? "Ubah" : "Tambah"}
              </Button>
            </Flex>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

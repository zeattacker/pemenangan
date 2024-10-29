import {
  Badge,
  Button,
  Drawer,
  Flex,
  Group,
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
  useNavigation,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { DptSelect } from "~/components/atoms/DptSelect";
import { Voter } from "~/domain";
import { action } from "~/routes/panel.voter.view.($id)";
import drawerClasses from "~/styles/drawer.module.css";

export default function ViewVoterPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const isOpen = location.pathname.includes("/panel/voter/view");
  const voter = location.state as Voter;
  const isSubmitting = navigation.state == "submitting";
  const submit = useSubmit();
  const form = useForm({
    initialValues: {
      voterId: voter?.id || "",
      isActive: true,
    },
  });
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        notifications.show({
          title: "Berhasil!",
          message: `${actionData.data?.dpt?.name} berhasil diaktifkan`,
          color: "green",
          position: "top-center",
        });
        navigate("/panel/voter");
      } else {
        notifications.show({
          title: "Ooops...",
          message: `Gagal mengaktifkan DPT`,
          color: "red",
          position: "top-center",
        });
      }
    }
  }, [actionData, navigate]);

  console.log(voter);

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
          <Drawer.Title fw={600}>Detail Voter</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Flex direction="column" gap="xs">
            <Group align="center" justify="space-between">
              <Flex direction="column">
                <Text size="sm" c="gray.6">
                  Nama
                </Text>
                <Text fw="bold">{voter?.dpt?.name}</Text>
              </Flex>
              <Badge color={voter?.isActive ? "green" : "red"}>
                {voter?.isActive ? "Aktif" : "Nonaktif"}
              </Badge>
            </Group>
            <Group grow>
              <Flex direction="column">
                <Text size="sm" c="gray.6">
                  NIK
                </Text>
                <Text fw="bold">{voter?.nik || "-"}</Text>
              </Flex>
              <Flex direction="column">
                <Text size="sm" c="gray.6">
                  TPS
                </Text>
                <Text fw="bold">{voter?.dpt?.votingStation?.name || "-"}</Text>
              </Flex>
            </Group>

            <Group grow>
              <Flex direction="column">
                <Text size="sm" c="gray.6">
                  Address
                </Text>
                <Text fw="bold">{voter?.dpt?.address}</Text>
              </Flex>
              <Flex direction="column">
                <Text size="sm" c="gray.6">
                  Kelurahan
                </Text>
                <Text fw="bold">{voter?.dpt?.village?.name}</Text>
              </Flex>
            </Group>
            <Group grow>
              <Flex direction="column">
                <Text size="sm" c="gray.6">
                  Gender
                </Text>
                <Text fw="bold" tt="capitalize">
                  {voter?.dpt?.gender}
                </Text>
              </Flex>
              <Flex direction="column">
                <Text size="sm" c="gray.6">
                  Umur
                </Text>
                <Text fw="bold">{voter?.dpt?.age}</Text>
              </Flex>
              <Flex direction="column">
                <Text size="sm" c="gray.6">
                  RT
                </Text>
                <Text fw="bold">{voter?.dpt?.rt}</Text>
              </Flex>
              <Flex direction="column">
                <Text size="sm" c="gray.6">
                  RW
                </Text>
                <Text fw="bold">{voter?.dpt?.rw}</Text>
              </Flex>
            </Group>
            <Button
              mt="md"
              onClick={() => submit(form.getValues(), { method: "POST" })}
              disabled={voter?.isActive}
              loading={isSubmitting}
            >
              Aktifkan
            </Button>
          </Flex>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

import { Button, Drawer, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";

import drawerClasses from "~/styles/drawer.module.css";

interface DeleteItemPageProps {
  type?: string;
}

interface ItemLoaderProps {
  item: string;
  id: string | number;
}

export function withDeleteType(
  WrappedComponent: React.ComponentType<DeleteItemPageProps>,
  type: string
) {
  return function WithType(props: Omit<DeleteItemPageProps, "type">) {
    return <WrappedComponent {...props} type={type} />;
  };
}

export default function DeleteItemPage({ type = "Data" }: DeleteItemPageProps) {
  const navigate = useNavigate();
  const submit = useSubmit();
  const data = useLoaderData<ItemLoaderProps>(); //non casting typeof
  const actionData = useActionData<{ success: boolean }>();

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        notifications.show({
          title: "Berhasil!",
          message: "Data berhasil dihapus!",
          color: "green",
          position: "top-center",
        });
        navigate("/panel/voter");
      } else {
        notifications.show({
          title: "Oops...",
          message: "Data gagal dihapus",
          color: "red",
          position: "top-center",
        });
      }
    }
  }, [actionData, data, navigate]);

  return (
    <Drawer.Root
      opened
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
          <Drawer.Title fw={600}>Hapus {type}</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Text>
            Apakah anda ingin menghapus <strong>{data.item}</strong> dari data{" "}
            <strong>{type}</strong>?
          </Text>
          <Button
            color="red"
            fullWidth
            mt="md"
            onClick={() =>
              submit(
                { id: data.id },
                { method: "POST", encType: "application/json" }
              )
            }
          >
            Ya, Hapus
          </Button>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

import { Drawer } from "@mantine/core";
import { useLocation, useNavigate, useParams } from "@remix-run/react";
import drawerClasses from "~/styles/drawer.module.css";

export default function ManageRecapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = location.pathname.includes("/panel/recap/manage");
  const { id } = useParams();

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
        <Drawer.Body></Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

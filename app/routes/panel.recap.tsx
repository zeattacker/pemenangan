import { MetaFunction } from "@remix-run/node";
import RecapPage from "~/presentation/recap/recap-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Rekapitulasi | E-Pemenangan" },
    {
      property: "og:title",
      content: "Rekapitulasi | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export default RecapPage;

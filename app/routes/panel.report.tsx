import { MetaFunction } from "@remix-run/node";
import ReportPage from "~/presentation/report/report-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Laporan | E-Pemenangan" },
    {
      property: "og:title",
      content: "Laporan | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export default ReportPage;

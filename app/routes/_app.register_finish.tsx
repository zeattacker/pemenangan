import { MetaFunction } from "@remix-run/node";
import RegisterCompletePage from "~/presentation/auth/register-complete-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Pendaftaran Selesai | E-Pemenangan" },
    {
      property: "og:title",
      content: "Pendaftaran Selesai | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export default RegisterCompletePage;

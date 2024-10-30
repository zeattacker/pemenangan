import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getTps } from "~/adapter/controllers/tps.server";
import TpsPage from "~/presentation/tps/tps-page";

export const meta: MetaFunction = () => {
  return [
    { title: "TPS | E-Pemenangan" },
    {
      property: "og:title",
      content: "TPS | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const tpss = await getTps("", request); //1 for mojokerto
  return json({ ...tpss });
}

export default TpsPage;

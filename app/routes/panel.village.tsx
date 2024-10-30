import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getDistricts } from "~/adapter/controllers/district.server";
import { getVillages } from "~/adapter/controllers/village.server";
import VillagePage from "~/presentation/villages/village-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Kelurahan | E-Pemenangan" },
    {
      property: "og:title",
      content: "Kelurahan | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const districtId = searchParams.get("districtId");

  const districts = await getDistricts("", request, "select");
  const villages = await getVillages(districtId || "", request); //1 for mojokerto
  return json({ villages, districts });
}

export default VillagePage;

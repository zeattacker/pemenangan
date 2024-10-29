import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getDistricts } from "~/adapter/controllers/district.server";
import { getVillages } from "~/adapter/controllers/village.server";
import VillagePage from "~/presentation/villages/village-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const districtId = searchParams.get("districtId");

  const districts = await getDistricts("", request, "select");
  const villages = await getVillages(districtId || "", request); //1 for mojokerto
  return json({ villages, districts });
}

export default VillagePage;

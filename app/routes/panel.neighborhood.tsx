import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getDistricts } from "~/adapter/controllers/district.server";
import { getNeighborhoods } from "~/adapter/controllers/neighborhood.server";
import { Neighborhood } from "~/domain";
import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import NeighborhoodPage from "~/presentation/neighborhood/neighborhood-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Lingkungan | E-Pemenangan" },
    {
      property: "og:title",
      content: "Lingkungan | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const villageId = searchParams.get("villageId");

  const districts = await getDistricts("", request, "select");
  const neighborhoods = (await getNeighborhoods(
    villageId || "",
    request
  )) as PaginationResponseDto<Neighborhood[]>; //1 for mojokerto
  return json({ neighborhoods, districts });
}

export default NeighborhoodPage;

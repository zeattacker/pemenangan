import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getDistricts } from "~/adapter/controllers/district.server";
import { getNeighborhoods } from "~/adapter/controllers/neighborhood.server";
import { Neighborhood } from "~/domain";
import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import NeighborhoodPage from "~/presentation/neighborhood/neighborhood-page";

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

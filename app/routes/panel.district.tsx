import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getDistricts } from "~/adapter/controllers/district.server";
import { District } from "~/domain";
import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import DistrictPage from "~/presentation/districts/district-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const districts = (await getDistricts("1", request)) as PaginationResponseDto<
    District[]
  >; //1 for mojokerto
  return json({ ...districts });
}

export default DistrictPage;

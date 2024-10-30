import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getDistricts } from "~/adapter/controllers/district.server";
import { District } from "~/domain";
import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import DistrictPage from "~/presentation/districts/district-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Kecamatan | E-Pemenangan" },
    {
      property: "og:title",
      content: "Kecamatan | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const districts = (await getDistricts("1", request)) as PaginationResponseDto<
    District[]
  >; //1 for mojokerto
  return json({ ...districts });
}

export default DistrictPage;

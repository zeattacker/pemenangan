import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getDistricts } from "~/adapter/controllers/district.server";

import { getVoters } from "~/adapter/controllers/voter.server";
import VoterPage from "~/presentation/voter/voter-page";

export const meta: MetaFunction = () => {
  return [
    { title: "DPT | E-Pemenangan" },
    {
      property: "og:title",
      content: "DPT | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const districts = await getDistricts("1", request, "select");
  const voters = await getVoters(request, {
    page: 1,
    limit: searchParams.get("limit") || 10,
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    villageId: searchParams.get("villageId") || "",
    districtId: searchParams.get("districtId") || "",
  });
  // const voters = await getVoters(request, { page: 1, limit: 10000 }); //1 for mojokerto
  return json({ voters, districts });
}

export default VoterPage;

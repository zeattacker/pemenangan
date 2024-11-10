import { json } from "@remix-run/node";
import { getCandidates } from "~/adapter/controllers/candidate.server";
import { getDistricts } from "~/adapter/controllers/district.server";
import ManageRecapPage from "~/presentation/recap/manage-recap-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const districts = await getDistricts("1", request, "select"); //1 for mojokerto
  const candidates = await getCandidates(request, "select");
  return json({ districts, candidates });
}

export default ManageRecapPage;

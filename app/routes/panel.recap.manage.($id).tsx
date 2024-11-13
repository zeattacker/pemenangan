import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { getCandidates } from "~/adapter/controllers/candidate.server";
import { getDistricts } from "~/adapter/controllers/district.server";
import { manageRecap } from "~/adapter/controllers/recap.server";
import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import { ManageRecapDto } from "~/infra/dtos/manage-recap.dto";
import ManageRecapPage from "~/presentation/recap/manage-recap-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const districts = await getDistricts("1", request, "select"); //1 for mojokerto
  const candidates = await getCandidates(request, "select");
  return json({ districts, candidates });
}

export async function action({ request }: ActionFunctionArgs) {
  // const formData = await request.formData();
  const jsonData = await request.json();
  const recapData: ManageRecapDto = {
    votingStationId: +jsonData.votingStationId,
    invalidVote: +jsonData.invalidVote,
    candidates: jsonData.candidates.map((item: any) => {
      return { validVote: +item.validVote, candidateId: +item.candidateId };
    }),
  };
  try {
    const recapCreate = await manageRecap(
      recapData,
      recapData.votingStationId,
      request
    );
    return json({ success: true, data: { ...recapCreate?.data } });
  } catch (error) {
    console.log(error);
    return json(
      {
        success: false,
        data: null,
        error: (error as ErrorResponseDto).errors[0].detail,
      },
      { status: 400 }
    );
  }
}

export default ManageRecapPage;

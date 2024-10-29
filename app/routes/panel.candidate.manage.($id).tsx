import { ActionFunctionArgs, json } from "@remix-run/node";
import { manageCandidate } from "~/adapter/controllers/candidate.server";
import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import ManageCandidatePage from "~/presentation/candidates/manage-candidate-page";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const candidate = await manageCandidate(formData, request);
    // if ("errors" in dpt!) throw dpt;

    return json({ success: true, data: { ...candidate?.data } });
  } catch (error) {
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

export default ManageCandidatePage;

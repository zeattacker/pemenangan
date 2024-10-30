import { ActionFunctionArgs, json } from "@remix-run/node";
import { updateVoter } from "~/adapter/controllers/voter.server";
import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import ViewVoterPage from "~/presentation/voter/view-voter-page";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("voterId")?.toString() || "";
  const isActive = formData.get("isActive")?.toString() == "true" || false;

  try {
    const voter = await updateVoter(id, isActive, request);
    // if ("errors" in dpt!) throw dpt;

    return json({ success: true, data: { ...voter?.data } });
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
export default ViewVoterPage;

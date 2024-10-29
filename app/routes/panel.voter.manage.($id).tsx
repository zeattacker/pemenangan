import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  createVoter,
  getDptById
} from "~/adapter/controllers/voter.server";
import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import ManageVoterPage from "~/presentation/voter/manage-voter-page";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const dpt = await createVoter(formData, request);
    // if ("errors" in dpt!) throw dpt;

    return json({ success: true, data: { ...dpt?.data } });
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

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id;
  let dpt = null;
  if (id) {
    dpt = (await getDptById(id, request))?.data;
  }

  return json({ dpt });
}

export default ManageVoterPage;

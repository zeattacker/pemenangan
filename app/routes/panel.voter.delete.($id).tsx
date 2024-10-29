import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { deleteVoter, getDptById } from "~/adapter/controllers/voter.server";
// import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import DeleteItemPage, {
  withDeleteType,
} from "~/presentation/utils/delete-item-page";

export async function action({ request }: ActionFunctionArgs) {
  const { id } = await request.json();
  try {
    const response = await deleteVoter(id, request);

    return json({ success: true });
  } catch (error) {
    console.log(error);
    return json(
      {
        success: false,
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

  if (dpt == undefined) {
    return redirect("/panel/voter");
  }

  return json({ item: dpt?.fullName, id: dpt?.id });
}

export default withDeleteType(DeleteItemPage, "DPT", "/panel/voter");

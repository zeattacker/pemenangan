import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { deleteRecap } from "~/adapter/controllers/recap.server";
import { deleteVoter, getDptById } from "~/adapter/controllers/voter.server";
// import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import DeleteItemPage, {
  withDeleteType,
} from "~/presentation/utils/delete-item-page";

export async function action({ request }: ActionFunctionArgs) {
  const { id } = await request.json();
  try {
    const response = await deleteRecap(id, request);

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
  //   let recap = null;
  //   if (id) {
  //     recap = (await getDptById(id, request))?.data;
  //   }

  //   if (dpt == undefined) {
  //     return redirect("/panel/recap");
  //   }

  return json({ item: "data ini", id });
}

export default withDeleteType(DeleteItemPage, "Rekapitulasi", "/panel/recap");

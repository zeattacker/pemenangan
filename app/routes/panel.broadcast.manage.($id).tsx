import { ActionFunctionArgs, json } from "@remix-run/node";
import { manageBroadcast } from "~/adapter/controllers/broadcast.server";
import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import ManageBroadcastPage from "~/presentation/broadcast/manage-broadcast-page";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const broadcast = await manageBroadcast(formData, request);
    // if ("errors" in dpt!) throw dpt;

    return json({ success: true, data: { ...broadcast?.data } });
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

export default ManageBroadcastPage;

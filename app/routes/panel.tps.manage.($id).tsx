import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { getDistrictsSelect } from "~/adapter/controllers/area.server";
import { getTpsById, manageTps } from "~/adapter/controllers/tps.server";
import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import ManageTpsPage from "~/presentation/tps/manage-tps-page";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const dpt = await manageTps(formData, request);
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
  //   const user = await getUserById(params.id!, request); //1 for mojokerto
  const districts = await getDistrictsSelect("1"); //1 for mojokerto
  const id = params.id;
  let tps = null;
  if (id) tps = await getTpsById(params.id!, request);
  return json({ districts, tps });
}

export default ManageTpsPage;

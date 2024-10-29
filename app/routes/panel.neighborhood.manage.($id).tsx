import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { getDistricts } from "~/adapter/controllers/district.server";
import { manageNeighborhood } from "~/adapter/controllers/neighborhood.server";
import { manageVillage } from "~/adapter/controllers/village.server";
import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import ManageNeighborhoodPage from "~/presentation/neighborhood/manage-neighborhood-page";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const dpt = await manageNeighborhood(formData, request);
    // if ("errors" in dpt!) throw dpt;

    return json({ success: true, data: { ...dpt?.data } });
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

export async function loader({ request }: LoaderFunctionArgs) {
  const districts = await getDistricts("", request, "select");

  return json({ districts });
}

export default ManageNeighborhoodPage;

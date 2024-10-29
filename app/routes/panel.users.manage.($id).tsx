import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { getDistricts } from "~/adapter/controllers/district.server";
import { manageUser } from "~/adapter/controllers/user.server";
import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import ManageUserPage from "~/presentation/users/manage-user-page";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const districts = await getDistricts("1", request, "select"); //1 for mojokerto
  return json({ districts });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const user = await manageUser(formData, request);
    // if ("errors" in dpt!) throw dpt;

    return json({ success: true, data: { ...user?.data } });
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

export default ManageUserPage;

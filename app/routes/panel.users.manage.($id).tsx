import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { validateUser } from "~/adapter/controllers/auth.server";
import { getDistricts } from "~/adapter/controllers/district.server";
import { manageUser } from "~/adapter/controllers/user.server";
import { User } from "~/domain/entities/user.entity";
import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import ManageUserPage from "~/presentation/users/manage-user-page";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const districts = await getDistricts("1", request, "select"); //1 for mojokerto
  const user = (await validateUser(request)) as User | null;
  if (
    user &&
    (user.hasGroups.includes("Relawan") || user.hasGroups.includes("Saksi"))
  ) {
    return redirect("/panel/dashboard");
  }

  return json({ districts, user });
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

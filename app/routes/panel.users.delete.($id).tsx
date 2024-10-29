import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { validateUser } from "~/adapter/controllers/auth.server";
import { deleteUser, getUserById } from "~/adapter/controllers/user.server";
import { User } from "~/domain/entities/user.entity";
// import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import DeleteItemPage, {
  withDeleteType,
} from "~/presentation/utils/delete-item-page";

export async function action({ request }: ActionFunctionArgs) {
  const { id } = await request.json();
  try {
    const response = await deleteUser(id, request);

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
  const activeUser = (await validateUser(request)) as User | null;
  if (
    activeUser &&
    (activeUser.hasGroups.includes("Relawan") ||
      activeUser.hasGroups.includes("Saksi"))
  ) {
    return redirect("/panel/dashboard");
  }
  
  const id = params.id;
  let user = null;
  console.log(id);
  if (id) {
    user = (await getUserById(id, request))?.data;
    console.log(user);
  }

  if (user == undefined) {
    return redirect("/panel/users");
  }

  return json({ item: user?.userExtend.fullName, id: user?.id });
}

export default withDeleteType(DeleteItemPage, "User", "/panel/users");

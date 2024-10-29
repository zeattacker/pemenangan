import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { logout, validateUser } from "~/adapter/controllers/auth.server";
import { User } from "~/domain/entities/user.entity";
import ProfilePage from "~/presentation/panel/profile-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = (await validateUser(request)) as User | null;

  return json({ user });
}

export async function action({ context, params, request }: ActionFunctionArgs) {
  if (request.method == "DELETE") {
    return logout(request);
  } else if (request.method == "POST") {
  }
  return json({});
}
export default ProfilePage;

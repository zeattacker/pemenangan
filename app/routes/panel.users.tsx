import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getUsers } from "~/adapter/controllers/user.server";
import UserPage from "~/presentation/users/user-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const users = await getUsers(request); //1 for mojokerto
  return json({ users });
}

export default UserPage;

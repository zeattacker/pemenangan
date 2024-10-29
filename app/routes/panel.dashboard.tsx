import { json, LoaderFunctionArgs } from "@remix-run/node";
import { validateUser } from "~/adapter/controllers/auth.server";
import { User } from "~/domain/entities/user.entity";
import DashboardPage from "~/presentation/panel/dashboard-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = (await validateUser(request)) as User | null;

  return json({ user });
}
export default DashboardPage;

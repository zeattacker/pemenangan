import { json, LoaderFunctionArgs } from "@remix-run/node";
import { validateUser } from "~/adapter/controllers/auth.server";
import { getDashboardTop } from "~/adapter/controllers/dashboard.server";
import { User } from "~/domain/entities/user.entity";
import DashboardPage from "~/presentation/panel/dashboard-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = (await validateUser(request)) as User | null;
  const dashboardTop = await getDashboardTop(request);

  return json({ user, dashboardTop });
}
export default DashboardPage;

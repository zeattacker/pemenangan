import { json, LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { validateUser } from "~/adapter/controllers/auth.server";
import { getUsers } from "~/adapter/controllers/user.server";
import { User } from "~/domain/entities/user.entity";
import UserPage from "~/presentation/users/user-page";

export const meta: MetaFunction = () => {
  return [
    { title: "User | E-Pemenangan" },
    {
      property: "og:title",
      content: "User | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const users = await getUsers(request); //1 for mojokerto
  const user = (await validateUser(request)) as User | null;
  if (
    user &&
    (user.hasGroups.includes("Relawan") || user.hasGroups.includes("Saksi"))
  ) {
    return redirect("/panel/dashboard");
  }
  return json({ users });
}

export default UserPage;

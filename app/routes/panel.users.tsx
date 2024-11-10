import {
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { validateUser } from "~/adapter/controllers/auth.server";
import { getDistricts } from "~/adapter/controllers/district.server";
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
  const { searchParams } = new URL(request.url);
  const users = await getUsers(request, {
    page: 1,
    limit: searchParams.get("limit") || 10,
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    villageId: searchParams.get("villageId") || "",
    districtId: searchParams.get("districtId") || "",
  });

  const user = (await validateUser(request)) as User | null;
  if (
    user &&
    (user.hasGroups.includes("Relawan") || user.hasGroups.includes("Saksi"))
  ) {
    return redirect("/panel/dashboard");
  }

  const districts = await getDistricts("1", request, "select");
  return json({ users, districts });
}

export default UserPage;

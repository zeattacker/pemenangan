import { ActionFunctionArgs, json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { logout, validateUser } from "~/adapter/controllers/auth.server";
import { User } from "~/domain/entities/user.entity";
import ProfilePage from "~/presentation/panel/profile-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Profil | E-Pemenangan" },
    {
      property: "og:title",
      content: "Profil | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

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

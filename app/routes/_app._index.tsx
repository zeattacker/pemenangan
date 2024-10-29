import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/node";
import { handleLogin } from "~/adapter/controllers/auth.server";
import LoginPage from "~/presentation/auth/login-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Login | E-Pemenangan" },
    {
      property: "og:title",
      content: "Login | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  return handleLogin(username, password);
}
export default LoginPage;

import { ActionFunctionArgs, json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getDistrictsSelect } from "~/adapter/controllers/area.server";
import { registerUser } from "~/adapter/controllers/user.server";
import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import RegisterPage from "~/presentation/auth/register-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Daftar | E-Pemenangan" },
    {
      property: "og:title",
      content: "Daftar | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const districts = await getDistrictsSelect("1"); //1 for mojokerto
  return json({ districts });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const user = await registerUser(formData);

    if ("errors" in user) throw user;

    return json({ success: true, data: user });
  } catch (error) {
    return json(
      { success: false, error: (error as ErrorResponseDto).errors[0].detail },
      { status: 400 }
    );
  }
}

export default RegisterPage;

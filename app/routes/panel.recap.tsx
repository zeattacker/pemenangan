import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getRecaps } from "~/adapter/controllers/recap.server";
import RecapPage from "~/presentation/recap/recap-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Rekapitulasi | E-Pemenangan" },
    {
      property: "og:title",
      content: "Rekapitulasi | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const recaps = await getRecaps(request, {
    page: 1,
    limit: 10,
  });
  return json({ recaps });
}

export default RecapPage;

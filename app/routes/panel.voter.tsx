import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import { getVoters } from "~/adapter/controllers/voter.server";
import VoterPage from "~/presentation/voter/voter-page";

export const meta: MetaFunction = () => {
  return [
    { title: "DPT | E-Pemenangan" },
    {
      property: "og:title",
      content: "DPT | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const voters = await getVoters(request, { page: 1, limit: 10000 }); //1 for mojokerto
  return json({ voters });
}

export default VoterPage;

import { json, LoaderFunctionArgs } from "@remix-run/node";
import { ShouldRevalidateFunctionArgs } from "@remix-run/react";

import { getVoters } from "~/adapter/controllers/voter.server";
import VoterPage from "~/presentation/voter/voter-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const voters = await getVoters(request); //1 for mojokerto
  return json({ voters });
}

export default VoterPage;

import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getTps } from "~/adapter/controllers/tps.server";
import TpsPage from "~/presentation/tps/tps-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const tpss = await getTps("", request); //1 for mojokerto
  return json({ ...tpss });
}

export default TpsPage;

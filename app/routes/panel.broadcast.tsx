import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getBroadcasts } from "~/adapter/controllers/broadcast.server";
import BroadcastPage from "~/presentation/broadcast/broadcast-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const broadcasts = await getBroadcasts(request);
  return json({ broadcasts });
}

export default BroadcastPage;

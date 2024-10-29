import { json, LoaderFunctionArgs } from "@remix-run/node";
import { validateUser } from "~/adapter/controllers/auth.server";
import { getBroadcasts } from "~/adapter/controllers/broadcast.server";
import { User } from "~/domain/entities/user.entity";
import BroadcastPage from "~/presentation/broadcast/broadcast-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const broadcasts = await getBroadcasts(request);
  const user = (await validateUser(request)) as User | null;
  return json({ broadcasts, user });
}

export default BroadcastPage;

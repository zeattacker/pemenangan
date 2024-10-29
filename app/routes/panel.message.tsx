import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getMessages } from "~/adapter/controllers/messaging.server";
import MessagePage from "~/presentation/message/message-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const messages = await getMessages(request);

  return json({ messages });
}

export default MessagePage;

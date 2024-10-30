import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getMessages } from "~/adapter/controllers/messaging.server";
import MessagePage from "~/presentation/message/message-page";

export const meta: MetaFunction = () => {
  return [
    { title: "Pesan | E-Pemenangan" },
    {
      property: "og:title",
      content: "Pesan | E-Pemenangan",
    },
    {
      name: "description",
      content: "Aplikasi Pendataan Pemenangan Pilkada 2024",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const messages = await getMessages(request);

  return json({ messages });
}

export default MessagePage;

import { redirect } from "@remix-run/node";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const authRepository = new RemixSessionRepository();

export async function requireAuth(request: Request) {
  const session = await authRepository.getSession(
    request.headers.get("Cookie")!
  );
  //   const userId = session?.accessToken;

  if (!session) {
    throw redirect("/", {
      headers: {
        "Set-Cookie": await authRepository.destroySession(
          request.headers.get("Cookie")!
        ),
      },
    });
  }

  return true;
}

import { redirect } from "@remix-run/node";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class LogoutUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  async execute(request: Request): Promise<Response> {
    return redirect("/", {
      headers: {
        "Set-Cookie": await this.sessionRepository.destroySession(
          request.headers.get("Cookie")!
        ),
      },
    });
  }
}

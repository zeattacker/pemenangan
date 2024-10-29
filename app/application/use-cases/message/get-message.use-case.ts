import { IMessageRepository } from "~/domain/interfaces/message-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";

export class GetMessageUseCase {
  constructor(
    private messageRepository: IMessageRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(cookieHeader?: string | null) {
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }
    return this.messageRepository.getMessages(accessToken);
  }
}

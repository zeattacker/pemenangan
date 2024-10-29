import { IMessageRepository } from "~/domain/interfaces/message-repo.interface";
import { ISessionRepository } from "~/domain/interfaces/session-repo.interface";
import { ManageMessageDto } from "~/infra/dtos/manage-message.dto";

export class CreateMessageUseCase {
  constructor(
    private messageRepository: IMessageRepository,
    private sessionRepository: ISessionRepository
  ) {}

  async execute(message: ManageMessageDto, cookieHeader?: string | null) {
    // Tambahkan validasi jika diperlukan
    const accessToken = await this.sessionRepository.getAccessToken(
      cookieHeader
    );

    if (!accessToken) {
      return null;
    }

    return this.messageRepository.createMessage(message, accessToken);
  }
}

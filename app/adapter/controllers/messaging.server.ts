import { GetMessageUseCase } from "~/application/use-cases/message/get-message.use-case";
import { ApiMessageRepository } from "~/infra/repositories/api-message.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const messageRepository = new ApiMessageRepository(API_BASE_URL);
const sessionRepository = new RemixSessionRepository();

const getMessageUC = new GetMessageUseCase(
  messageRepository,
  sessionRepository
);

export async function getMessages(request: Request) {
  return getMessageUC.execute(request.headers.get("Cookie")!);
}

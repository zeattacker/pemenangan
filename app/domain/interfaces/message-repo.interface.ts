import { ManageMessageDto } from "~/infra/dtos/manage-message.dto";
import { ObjectResponse } from "~/infra/dtos/object-response.dto";
import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { Message } from "../entities/message.entity";

export interface IMessageRepository {
  getMessages(accessToken: string): Promise<PaginationResponseDto<Message[]>>;
  getMessageById(
    messageId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<Message>>;
  createMessage(
    message: ManageMessageDto,
    accessToken: string
  ): Promise<ObjectResponse<Message>>;
  updateMessage(
    message: ManageMessageDto,
    messageId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<Message>>;
  deleteMessage(
    messageId: string | number,
    accessToken: string
  ): Promise<string>;
}

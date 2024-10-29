import { IMessageRepository } from "~/domain/interfaces/message-repo.interface";
import { PaginationResponseDto } from "../dtos/pagination-response.dto";
import { Message } from "~/domain/entities/message.entity";
import { ManageMessageDto } from "../dtos/manage-message.dto";
import { ObjectResponse } from "../dtos/object-response.dto";

export class ApiMessageRepository implements IMessageRepository {
  constructor(private apiBaseUrl: string) {}
  async getMessages(
    accessToken: string
  ): Promise<PaginationResponseDto<Message[]>> {
    const response = await fetch(`${this.apiBaseUrl}/news-reports`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  }

  async getMessageById(
    messageId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<Message>> {
    const response = await fetch(
      `${this.apiBaseUrl}/news-reports/${messageId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.json();
  }

  async createMessage(message: ManageMessageDto, accessToken: string) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/news-reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(message),
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async updateMessage(
    message: ManageMessageDto,
    messageId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<Message>> {
    const response = await fetch(
      `${this.apiBaseUrl}/news-reports/${messageId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(message),
      }
    );

    return response.json();
  }

  async deleteMessage(
    messageId: string | number,
    accessToken: string
  ): Promise<string> {
    const response = await fetch(
      `${this.apiBaseUrl}/news-reports/${messageId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.text();
  }
}

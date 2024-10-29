import { Broadcast } from "~/domain/entities/broadcast.entity";
import { IBroadcastRepository } from "~/domain/interfaces/broadcast-repo.interface";
import { ManageBroadcastDto } from "../dtos/manage-broadcast.dto";
import { ObjectResponse } from "../dtos/object-response.dto";
import { PaginationResponseDto } from "../dtos/pagination-response.dto";
export class ApiBroadcastRepository implements IBroadcastRepository {
  constructor(private apiUrl: string) {}

  async getBroadcasts(
    accessToken: string
  ): Promise<PaginationResponseDto<Broadcast[]>> {
    const response = await fetch(`${this.apiUrl}/broadcasts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  }

  async getBroadcastById(
    broadcastId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<Broadcast>> {
    const response = await fetch(`${this.apiUrl}/broadcasts/${broadcastId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  }

  async createBroadcast(broadcast: ManageBroadcastDto, accessToken: string) {
    try {
      const response = await fetch(`${this.apiUrl}/broadcasts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(broadcast),
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async updateBroadcast(
    broadcast: ManageBroadcastDto,
    broadcastId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<Broadcast>> {
    const response = await fetch(`${this.apiUrl}/broadcasts/${broadcastId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(broadcast),
    });

    return response.json();
  }

  async deleteBroadcast(
    broadcastId: string | number,
    accessToken: string
  ): Promise<string> {
    const response = await fetch(`${this.apiUrl}/broadcasts/${broadcastId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.text();
  }
}

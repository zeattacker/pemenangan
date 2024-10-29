import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { Broadcast } from "../entities/broadcast.entity";
import { ObjectResponse } from "~/infra/dtos/object-response.dto";
import { ManageBroadcastDto } from "~/infra/dtos/manage-broadcast.dto";

export interface IBroadcastRepository {
  getBroadcasts(
    accessToken: string
  ): Promise<PaginationResponseDto<Broadcast[]>>;
  getBroadcastById(
    broadcastId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<Broadcast>>;
  createBroadcast(
    broadcast: ManageBroadcastDto,
    accessToken: string
  ): Promise<ObjectResponse<Broadcast>>;
  updateBroadcast(
    broadcast: ManageBroadcastDto,
    broadcastId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<Broadcast>>;
  deleteBroadcast(
    broadcastId: string | number,
    accessToken: string
  ): Promise<string>;
}

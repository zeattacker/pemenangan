import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { TPS } from "../entities";
import { ObjectResponse } from "~/infra/dtos/object-response.dto";
import { ManageTpsDto } from "~/infra/dtos/manage-tps.dto";

export interface ITPSRepository {
  getTps(
    villageId: number | string,
    accessToken: string
  ): Promise<PaginationResponseDto<TPS[]>>;

  getTpsById(
    tpsId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<TPS>>;

  createTps(
    tps: Omit<ManageTpsDto, "id">,
    accessToken: string
  ): Promise<ObjectResponse<TPS>>;
  updateTps(
    tps: ManageTpsDto,
    accessToken: string
  ): Promise<ObjectResponse<TPS>>;
}

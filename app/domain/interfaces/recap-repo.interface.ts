import { ObjectResponse } from "~/infra/dtos/object-response.dto";
import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { Recap } from "../entities/recap.entity";
import { ManageRecapDto } from "~/infra/dtos/manage-recap.dto";
import { PaginationRequestDTO } from "~/infra/dtos/pagination-request.dto";

export interface IRecapRepository {
  getRecaps(
    accessToken: string,
    paginationRequest?: PaginationRequestDTO
  ): Promise<PaginationResponseDto<Recap[]>>;
  createRecap(
    recap: ManageRecapDto,
    accessToken: string
  ): Promise<ObjectResponse<Recap>>;
  updateRecap(
    recapId: number | string,
    data: ManageRecapDto,
    accessToken: string
  ): Promise<ObjectResponse<Recap>>;
  deleteRecap(recapId: string | number, accessToken: string): Promise<string>;
}

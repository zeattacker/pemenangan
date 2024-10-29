import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { Village } from "../entities";
import { ManageVillageDto } from "~/infra/dtos/manage-village.dto";
import { ObjectResponse } from "~/infra/dtos/object-response.dto";

export interface IVillageRepository {
  getVillages(
    districtId: number | string,
    accessToken: string
  ): Promise<PaginationResponseDto<Village[]>>;

  createVillage(
    villageData: ManageVillageDto,
    accessToken: string
  ): Promise<ObjectResponse<Village>>;
  updateVillage(
    villageData: ManageVillageDto,
    villageId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<Village>>;
}

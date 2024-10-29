import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { District } from "../entities/district.entity";
import { ObjectResponse } from "~/infra/dtos/object-response.dto";
import { ManageDistrictDto } from "~/infra/dtos/manage-district.dto";

export interface IDistrictRepository {
  getDistricts(
    cityId: number | string,
    accessToken?: string
  ): Promise<PaginationResponseDto<District[]>>;

  getDistrictById(
    districtId: number | string,
    accessToken?: string
  ): Promise<ObjectResponse<District>>;

  createDistrict(
    tps: Omit<ManageDistrictDto, "id">,
    accessToken: string
  ): Promise<ObjectResponse<District>>;
  updateDistrict(
    tps: ManageDistrictDto,
    accessToken: string
  ): Promise<ObjectResponse<District>>;
}

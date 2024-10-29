import { ManageNeighborhoodDto } from "~/infra/dtos/manage-neighborhood.dto";
import { ObjectResponse } from "~/infra/dtos/object-response.dto";
import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { District } from "../entities/district.entity";
import { Neighborhood } from "../entities";

export interface INeighborhoodRepository {
  getNeighborhoods(
    cityId: number | string,
    accessToken?: string
  ): Promise<PaginationResponseDto<Neighborhood[]>>;

  getNeighborhoodById(
    districtId: number | string,
    accessToken?: string
  ): Promise<ObjectResponse<Neighborhood>>;

  createNeighborhood(
    neighborhood: Omit<ManageNeighborhoodDto, "id">,
    accessToken: string
  ): Promise<ObjectResponse<Neighborhood>>;
  updateNeighborhood(
    neighborhood: ManageNeighborhoodDto,
    neighborhoodId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<Neighborhood>>;
}

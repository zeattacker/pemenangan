import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { DPT } from "../entities/dpt.entity";

export interface IDPTRepository {
  getDpts(
    query: {
      name: string;
      page: string;
      limit: string;
    },
    accessToken: string
  ): Promise<PaginationResponseDto<DPT[]>>;
}

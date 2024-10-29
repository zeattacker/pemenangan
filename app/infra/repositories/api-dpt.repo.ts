import { DPT } from "~/domain/entities/dpt.entity";
import { IDPTRepository } from "~/domain/interfaces/dpt-repo.interface";
import { PaginationResponseDto } from "../dtos/pagination-response.dto";

export class ApiDPTRepository implements IDPTRepository {
  constructor(private apiBaseUrl: string) {}

  async getDpts(
    query: {
      name: string;
      page: string;
      limit: string;
    },
    accessToken: string
  ): Promise<PaginationResponseDto<DPT[]>> {
    let headers = {};
    if (accessToken !== "")
      headers = {
        Authorization: `Bearer ${accessToken}`,
      };

    const response = await fetch(
      `${this.apiBaseUrl}/dpts?page=${query.page}&limit=${query.limit}${
        query.name ? `&search=${query.name}` : ""
      }`,
      {
        headers,
      }
    );
    return response.json();
  }
}

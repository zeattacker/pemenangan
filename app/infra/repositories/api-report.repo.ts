import { IReportRepository } from "~/domain/interfaces/report-repo.interface";
import { PaginationResponseDto } from "../dtos/pagination-response.dto";
import { ReportVoter } from "~/domain/entities/report-voter.entity";

export class ApiReportRepository implements IReportRepository {
  constructor(private apiBaseUrl: string) {}
  async getReportVoter(accessToken: string) {
    const response = await fetch(`${this.apiBaseUrl}/reports/voter`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
}

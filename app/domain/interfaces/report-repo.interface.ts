import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { ReportVoter } from "../entities/report-voter.entity";

export interface IReportRepository {
  getReportVoter(
    accessToken: string
  ): Promise<PaginationResponseDto<ReportVoter[]>>;
}

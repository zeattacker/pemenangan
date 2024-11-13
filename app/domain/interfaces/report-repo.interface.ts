import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { ReportVoter } from "../entities/report-voter.entity";
import { ReportRecap } from "../entities/report-recap.entity";

export interface IReportRepository {
  getReportVoter(
    accessToken: string
  ): Promise<PaginationResponseDto<ReportVoter[]>>;
  getReportRecap(
    accessToken: string
  ): Promise<PaginationResponseDto<ReportRecap[]>>;
}

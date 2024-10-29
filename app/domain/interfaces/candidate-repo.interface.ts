import { ManageCandidateDto } from "~/infra/dtos/manage-candidate.dto";
import { ObjectResponse } from "~/infra/dtos/object-response.dto";
import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { Candidate } from "../entities/candidate.entity";

export interface ICandidateRepository {
  getCandidates(
    accessToken: string
  ): Promise<PaginationResponseDto<Candidate[]>>;
  getCandidateById(
    candidateId: string | number,
    accessToken: string
  ): Promise<ObjectResponse<Candidate>>;
  createCandidate(
    candidate: ManageCandidateDto,
    accessToken: string
  ): Promise<ObjectResponse<Candidate>>;
  updateCandidate(
    candidate: ManageCandidateDto,
    candidateId: number | string,
    accessToken: string
  ): Promise<ObjectResponse<Candidate>>;
  deleteCandidate(dptId: string | number, accessToken: string): Promise<string>;
}

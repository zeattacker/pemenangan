import { ManageVoterDto } from "~/infra/dtos/manage-voter.dto";
import { ObjectResponse } from "~/infra/dtos/object-response.dto";
import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import { Voter } from "../entities";

export interface IVoterRepository {
  getVoters(accessToken: string): Promise<PaginationResponseDto<Voter[]>>;
  getVoterById(
    voterId: string | number,
    accessToken: string
  ): Promise<ObjectResponse<Voter>>;
  createVoter(
    voterData: ManageVoterDto,
    accessToken: string
  ): Promise<ObjectResponse<Voter>>;
  updateVoter(
    voterId: number | string,
    isActive: boolean,
    accessToken: string
  ): Promise<ObjectResponse<Voter>>;
  deleteVoter(dptId: string | number, accessToken: string): Promise<string>;
}

import { CreateVoterUseCase } from "~/application/use-cases/voter/create-voter.use-case";
import { DeleteVoterUseCase } from "~/application/use-cases/voter/delete-voter.use-case";
import { FindVoterUseCase } from "~/application/use-cases/voter/find-voter.use-case";
import { GetVoterUseCase } from "~/application/use-cases/voter/get-voter.use-case";
import { UpdateVoterUseCase } from "~/application/use-cases/voter/update-voter.use-case";
import { ManageVoterDto } from "~/infra/dtos/manage-voter.dto";
import { ApiVoterRepository } from "~/infra/repositories/api-voter.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const voterRepository = new ApiVoterRepository(API_BASE_URL);
const sessionRepository = new RemixSessionRepository();
const createVoterUC = new CreateVoterUseCase(
  voterRepository,
  sessionRepository
);
const getVoterUC = new GetVoterUseCase(voterRepository, sessionRepository);
const findVoterUC = new FindVoterUseCase(voterRepository, sessionRepository);
const updateVoterUC = new UpdateVoterUseCase(
  voterRepository,
  sessionRepository
);
const deleteVoterUC = new DeleteVoterUseCase(
  voterRepository,
  sessionRepository
);

export async function createVoter(formData: FormData, request: Request) {
  const voterData: ManageVoterDto = {
    nik: formData.get("nik")?.toString() || "",
    dptId: formData.get("dptId")?.toString() || "",
  };

  return createVoterUC.execute(voterData, request.headers.get("Cookie"));
}

export async function updateVoter(
  voterId: number | string,
  isActive: boolean,
  request: Request
) {
  return updateVoterUC.execute(
    voterId,
    isActive,
    request.headers.get("Cookie")
  );
}

export async function getVoters(request: Request) {
  return getVoterUC.execute(request.headers.get("Cookie")!);
}

export async function getDptById(dptId: number | string, request: Request) {
  return findVoterUC.execute(dptId, request.headers.get("Cookie"));
}

export async function deleteDpt(dptId: number | string, request: Request) {
  return deleteVoterUC.execute(dptId, request.headers.get("Cookie"));
}

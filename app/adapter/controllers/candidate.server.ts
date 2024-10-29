import { CreateCandidateUseCase } from "~/application/use-cases/candidate/create-candidate.use-case";
import { DeleteCandidateUseCase } from "~/application/use-cases/candidate/delete-candidate.use-case";
import { GetCandidateUseCase } from "~/application/use-cases/candidate/get-candidate.use-case";
import { UpdateCandidateUseCase } from "~/application/use-cases/candidate/update-candidate.use-case";
import { ManageCandidateDto } from "~/infra/dtos/manage-candidate.dto";
import { ApiCandidateRepository } from "~/infra/repositories/api-candidate.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const candidateRepository = new ApiCandidateRepository(API_BASE_URL);
const sessionRepository = new RemixSessionRepository();
const createCandidateUC = new CreateCandidateUseCase(
  candidateRepository,
  sessionRepository
);
const getCandidateUC = new GetCandidateUseCase(
  candidateRepository,
  sessionRepository
);
const updateCandidateUC = new UpdateCandidateUseCase(
  candidateRepository,
  sessionRepository
);
const deleteCandidateUC = new DeleteCandidateUseCase(
  candidateRepository,
  sessionRepository
);

export async function manageCandidate(formData: FormData, request: Request) {
  const id = formData.get("id")?.toString() || "";
  const candidateData: ManageCandidateDto = {
    name: formData.get("name")?.toString() || "",
    viceName: formData.get("viceName")?.toString() || "",
    pemiluSessionId: 1,
  };

  if (id == "") {
    return createCandidateUC.execute(
      candidateData,
      request.headers.get("Cookie")
    );
  } else
    return updateCandidateUC.execute(
      candidateData,
      id,
      request.headers.get("Cookie")
    );
}

export async function getCandidates(request: Request) {
  return getCandidateUC.execute(request.headers.get("Cookie")!);
}

// export async function getDptById(dptId: number | string, request: Request) {
//   return findDptUC.execute(dptId, request.headers.get("Cookie"));
// }

export async function deleteCandidate(
  candidateId: number | string,
  request: Request
) {
  return deleteCandidateUC.execute(candidateId, request.headers.get("Cookie"));
}

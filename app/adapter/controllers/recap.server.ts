import { CreateRecapUseCase } from "~/application/use-cases/recap/create-recap.use-case";
import { DeleteRecapUseCase } from "~/application/use-cases/recap/delete-recap.use-case";
import { GetRecapUseCase } from "~/application/use-cases/recap/get-recap.use-case";
import { UpdateRecapUseCase } from "~/application/use-cases/recap/update-recap.use-case";
import { ManageRecapDto } from "~/infra/dtos/manage-recap.dto";
import { PaginationRequestDTO } from "~/infra/dtos/pagination-request.dto";
import { ApiRecapRepository } from "~/infra/repositories/api-recap.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const recapRepository = new ApiRecapRepository(API_BASE_URL);
const sessionRepository = new RemixSessionRepository();
const createRecapUC = new CreateRecapUseCase(
  recapRepository,
  sessionRepository
);
const getRecapUC = new GetRecapUseCase(recapRepository, sessionRepository);
const updateRecapUC = new UpdateRecapUseCase(
  recapRepository,
  sessionRepository
);
const deleteRecapUC = new DeleteRecapUseCase(
  recapRepository,
  sessionRepository
);

export async function manageRecap(
  recapData: ManageRecapDto,
  recapId: string | number,
  request: Request
) {
  if (recapId == "") {
    return createRecapUC.execute(recapData, request.headers.get("Cookie"));
  } else {
    return updateRecapUC.execute(
      recapId,
      recapData,
      request.headers.get("Cookie")
    );
  }
}

export async function deleteRecap(recapId: number | string, request: Request) {
  return deleteRecapUC.execute(recapId, request.headers.get("Cookie"));
}

export async function getRecaps(
  request: Request,
  paginationRequest?: PaginationRequestDTO
) {
  return getRecapUC.execute(request.headers.get("Cookie")!, paginationRequest);
}

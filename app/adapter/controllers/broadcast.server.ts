import { CreateBroadcastUseCase } from "~/application/use-cases/broadcast/create-broadcast.use-case";
import { DeleteBroadcastUseCase } from "~/application/use-cases/broadcast/delete-broadcast.use-case";
import { GetBroadcastUseCase } from "~/application/use-cases/broadcast/get-broadcast.use-case";
import { UpdateBroadcastUseCase } from "~/application/use-cases/broadcast/update-broadcast.use-case";
import { ManageBroadcastDto } from "~/infra/dtos/manage-broadcast.dto";
import { ApiBroadcastRepository } from "~/infra/repositories/api-broadcast.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const broadcastRepository = new ApiBroadcastRepository(API_BASE_URL);
const sessionRepository = new RemixSessionRepository();
const createBroadcastUC = new CreateBroadcastUseCase(
  broadcastRepository,
  sessionRepository
);
const getBroadcastUC = new GetBroadcastUseCase(
  broadcastRepository,
  sessionRepository
);
const updateBroadcastUC = new UpdateBroadcastUseCase(
  broadcastRepository,
  sessionRepository
);
const deleteBroadcastUC = new DeleteBroadcastUseCase(
  broadcastRepository,
  sessionRepository
);

export async function manageBroadcast(formData: FormData, request: Request) {
  const id = formData.get("id")?.toString() || "";
  const broadcastData: ManageBroadcastDto = {
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
  };

  if (id == "") {
    return createBroadcastUC.execute(
      broadcastData,
      request.headers.get("Cookie")
    );
  } else
    return updateBroadcastUC.execute(
      broadcastData,
      id,
      request.headers.get("Cookie")
    );
}

export async function getBroadcasts(request: Request) {
  return getBroadcastUC.execute(request.headers.get("Cookie")!);
}

// export async function getDptById(dptId: number | string, request: Request) {
//   return findDptUC.execute(dptId, request.headers.get("Cookie"));
// }

export async function deleteBroadcasts(
  broadcastId: number | string,
  request: Request
) {
  return deleteBroadcastUC.execute(broadcastId, request.headers.get("Cookie"));
}

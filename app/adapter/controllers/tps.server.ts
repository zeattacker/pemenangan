import { CreateTpsUseCase } from "~/application/use-cases/tps/create-tps.use-case";
import { FindTpsUseCase } from "~/application/use-cases/tps/find-tps.use-case";
import { GetTpsDataUseCase } from "~/application/use-cases/tps/get-tps-data.use-case";
import { UpdateTpsUseCase } from "~/application/use-cases/tps/update-tps.use-case";
import { ManageTpsDto } from "~/infra/dtos/manage-tps.dto";
import { ApiTpsRepository } from "~/infra/repositories/api-tps.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const tpsRepository = new ApiTpsRepository(API_BASE_URL);
const sessionRepository = new RemixSessionRepository();
const getTpsDataUseCase = new GetTpsDataUseCase(
  tpsRepository,
  sessionRepository
);
const findTpsUseCase = new FindTpsUseCase(tpsRepository, sessionRepository);
const createTpsUseCase = new CreateTpsUseCase(tpsRepository, sessionRepository);
const updateTpsUseCase = new UpdateTpsUseCase(tpsRepository, sessionRepository);

export async function manageTps(formData: FormData, request: Request) {
  const tpsData: ManageTpsDto = {
    id: formData.get("id")?.toString() || "",
    name: formData.get("name")?.toString() || "",
    villageId: parseInt(formData.get("villageId")?.toString() || "-1"),
  };

  if (tpsData.id == "") {
    delete tpsData.id;
    return createTpsUseCase.execute(tpsData, request.headers.get("Cookie"));
  } else
    return updateTpsUseCase.execute(tpsData, request.headers.get("Cookie"));
}

export async function getTps(villageId: number | string, request: Request) {
  return getTpsDataUseCase.getTps(
    villageId,
    request.headers.get("Cookie") || ""
  );
}

export async function getTpsById(tpsId: number | string, request: Request) {
  return findTpsUseCase.execute(tpsId, request.headers.get("Cookie"));
}

export async function getTpsSelect(
  villageId: number | string,
  request: Request
) {
  const tps = await getTpsDataUseCase.getTps(
    villageId,
    request.headers.get("Cookie")
  );
  const data = tps?.data.map((tps) => {
    return {
      value: tps.id.toString(),
      label: tps.name,
    };
  });

  return {
    meta: tps?.meta,
    data,
  };
}

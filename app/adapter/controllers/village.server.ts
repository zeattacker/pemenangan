import { CreateVillageUseCase } from "~/application/use-cases/villages/create-village.use-case";
import { GetVillageUseCase } from "~/application/use-cases/villages/get-village.use-case";
import { UpdateVillageUseCase } from "~/application/use-cases/villages/update-village.use-case";
import { Village } from "~/domain";
import { ManageVillageDto } from "~/infra/dtos/manage-village.dto";
import { ApiVillageRepository } from "~/infra/repositories/api-village.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const villageRepository = new ApiVillageRepository(API_BASE_URL);
const sessionRepository = new RemixSessionRepository();
const getVillageUseCase = new GetVillageUseCase(
  villageRepository,
  sessionRepository
);
const createVillageUseCase = new CreateVillageUseCase(
  villageRepository,
  sessionRepository
);
const updateVillageUseCase = new UpdateVillageUseCase(
  villageRepository,
  sessionRepository
);

export async function getVillages(
  districtId: number | string = "",
  request: Request,
  type: string = "normal"
) {
  const villages = await getVillageUseCase.execute(
    districtId,
    request.headers.get("Cookie") || ""
  );

  if (type == "select") {
    const data = villages?.data.map((neighborhood: Village) => {
      return {
        value: neighborhood.id.toString(),
        label: neighborhood.name,
      };
    });
    return {
      data,
      meta: villages?.meta,
    };
  } else {
    return villages;
  }
}

export async function manageVillage(formData: FormData, request: Request) {
  const villageId = formData.get("id")?.toString() || "";

  const villageData: ManageVillageDto = {
    districtId: parseInt(formData.get("districtId")!.toString()) || "",
    name: formData.get("name")?.toString() || "",
  };

  if (villageId == "") {
    return createVillageUseCase.execute(
      villageData,
      request.headers.get("Cookie")
    );
  } else {
    const dat = await updateVillageUseCase.execute(
      villageData,
      villageId,
      request.headers.get("Cookie")
    );

    return dat;
  }
}

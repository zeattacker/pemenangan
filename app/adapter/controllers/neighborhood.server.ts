import { CreateNeighborhoodUseCase } from "~/application/use-cases/neighborhoods/create-neighborhood.use-case";
import { FindNeighborhoodUseCase } from "~/application/use-cases/neighborhoods/find-neighborhood.use-case";
import { GetNeighborhoodUseCase } from "~/application/use-cases/neighborhoods/get-neighborhood.use-case";
import { UpdateNeighborhoodUseCase } from "~/application/use-cases/neighborhoods/update-neighborhood.use-case";
import { Neighborhood } from "~/domain";
import { ManageNeighborhoodDto } from "~/infra/dtos/manage-neighborhood.dto";
import { ApiNeighborhoodRepository } from "~/infra/repositories/api-neighborhood.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const sessionRepository = new RemixSessionRepository();
const neighborhoodRepository = new ApiNeighborhoodRepository(API_BASE_URL);
const getNeighborhoodUseCase = new GetNeighborhoodUseCase(
  neighborhoodRepository,
  sessionRepository
);
const findNeighborhoodUseCase = new FindNeighborhoodUseCase(
  neighborhoodRepository,
  sessionRepository
);
const updateNeighborhoodUseCase = new UpdateNeighborhoodUseCase(
  neighborhoodRepository,
  sessionRepository
);
const createNeighborhoodUseCase = new CreateNeighborhoodUseCase(
  neighborhoodRepository,
  sessionRepository
);

export async function getNeighborhoods(
  villageId: number | string,
  request: Request,
  type: string = "normal"
) {
  const neighborhoods = await getNeighborhoodUseCase.execute(
    villageId,
    request.headers.get("Cookie") || ""
  );
  if (type == "select") {
    const data = neighborhoods?.data.map((neighborhood: Neighborhood) => {
      return {
        value: neighborhood.id.toString(),
        label: neighborhood.name,
      };
    });
    return {
      data,
      meta: neighborhoods?.meta,
    };
  } else {
    return neighborhoods;
  }
}

export async function getNeighborhoodById(
  villageId: number | string,
  request: Request
) {
  return findNeighborhoodUseCase.execute(
    villageId,
    request.headers.get("Cookie")
  );
}

export async function manageNeighborhood(formData: FormData, request: Request) {
  const neighborhoodId = formData.get("id")?.toString() || "";
  const neighborhoodData: ManageNeighborhoodDto = {
    villageId: parseInt(formData.get("villageId")?.toString() || ""),
    name: formData.get("name")?.toString() || "",
    rt: formData.get("rt")?.toString() || "",
    rw: formData.get("rw")?.toString() || "",
  };

  if (neighborhoodId == "") {
    return createNeighborhoodUseCase.execute(
      neighborhoodData,
      request.headers.get("Cookie")
    );
  } else
    return updateNeighborhoodUseCase.execute(
      neighborhoodData,
      neighborhoodId,
      request.headers.get("Cookie")
    );
}

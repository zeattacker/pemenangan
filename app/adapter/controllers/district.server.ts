import { ComboboxData, ComboboxItem } from "@mantine/core";
import { CreateDistrictUseCase } from "~/application/use-cases/district/create-district.use-case";
import { FindDistrictUseCase } from "~/application/use-cases/district/find-district.use-case";
import { GetDistrictUseCase } from "~/application/use-cases/district/get-district.use-case";
import { UpdateDistrictUseCase } from "~/application/use-cases/district/update-district.use-case";
import { ManageDistrictDto } from "~/infra/dtos/manage-district.dto";
import { ApiDistrictRepository } from "~/infra/repositories/api-district.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const districtRepository = new ApiDistrictRepository(API_BASE_URL);
const sessionRepository = new RemixSessionRepository();

const getDistrictUseCase = new GetDistrictUseCase(
  districtRepository,
  sessionRepository
);
const findDistrictUseCase = new FindDistrictUseCase(
  districtRepository,
  sessionRepository
);
const createDistrictUseCase = new CreateDistrictUseCase(
  districtRepository,
  sessionRepository
);
const updateDistrictUseCase = new UpdateDistrictUseCase(
  districtRepository,
  sessionRepository
);

export async function manageDistrict(formData: FormData, request: Request) {
  const districtData: ManageDistrictDto = {
    id: formData.get("id")?.toString() || "",
    cityOrRegencyId: 1,
    name: formData.get("name")?.toString() || "",
  };

  if (districtData.id == "") {
    delete districtData.id;
    return createDistrictUseCase.execute(
      districtData,
      request.headers.get("Cookie")
    );
  } else
    return updateDistrictUseCase.execute(
      districtData,
      request.headers.get("Cookie")
    );
}

export async function getDistricts(
  cityId: number | string,
  request: Request,
  type: string = "normal"
) {
  const districts = await getDistrictUseCase.getDistricts(
    cityId,
    request.headers.get("Cookie") || ""
  );
  if (type == "select") {
    const data = districts?.data.map((district) => {
      return {
        value: district.id.toString(),
        label: district.name,
      };
    });
    return {
      data,
      meta: districts?.meta,
    };
  } else {
    return districts;
  }
}

export async function getDistrictById(
  districtId: number | string,
  request: Request
) {
  return findDistrictUseCase.execute(districtId, request.headers.get("Cookie"));
}

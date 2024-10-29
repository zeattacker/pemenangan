import { GetAreaDataUseCase } from "~/application/use-cases/get-area-data.use-case";
import { ApiAreaRepository } from "~/infra/repositories/api-area.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const areaRepository = new ApiAreaRepository(API_BASE_URL);

const getAreaDataUseCase = new GetAreaDataUseCase(areaRepository);

export async function getProvinces() {
  return getAreaDataUseCase.getProvinces();
}

export async function getCities(provinceId: number | string) {
  return getAreaDataUseCase.getCities(provinceId);
}

export async function getDistricts(cityId: number | string) {
  return getAreaDataUseCase.getDistricts(cityId);
}
export async function getDistrictsSelect(cityId: number | string) {
  const districts = await getAreaDataUseCase.getDistricts(cityId);
  const data = districts.data.map((district) => {
    return {
      value: district.id.toString(),
      label: district.name,
    };
  });

  return {
    meta: districts.meta,
    data,
  };
}

export async function getVillages(districtId: number) {
  return getAreaDataUseCase.getVillages(districtId);
}

export async function getVillageSelect(districtId: number | string) {
  const villages = await getAreaDataUseCase.getVillages(districtId);
  const data = villages.data.map((village) => {
    return {
      value: village.id.toString(),
      label: village.name,
    };
  });

  return {
    meta: villages.meta,
    data,
  };
}

export async function getNeighborhoods(villageId: number | string) {
  return getAreaDataUseCase.getNeighborhoods(villageId);
}

export async function getNeighborhoodsSelect(villageId: number | string) {
  const neighborhoods = await getAreaDataUseCase.getNeighborhoods(villageId);
  const data = neighborhoods.data.map((neighborhood) => {
    return {
      value: neighborhood.id.toString(),
      label: neighborhood.name,
    };
  });

  return {
    meta: neighborhoods.meta,
    data,
  };
}

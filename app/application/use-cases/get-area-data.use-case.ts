import { City } from "~/domain/entities/city.entity";
import { Province } from "~/domain/entities/province.entity";
import { IAreaRepository } from "~/domain/interfaces/area-repo.interface";

export class GetAreaDataUseCase {
  constructor(private areaRepository: IAreaRepository) {}

  async getProvinces(): Promise<Province[]> {
    return this.areaRepository.getProvinces();
  }

  async getCities(provinceId: number | string): Promise<City[]> {
    return this.areaRepository.getCities(provinceId);
  }

  async getDistricts(cityId: number | string) {
    return this.areaRepository.getDistricts(cityId);
  }

  async getVillages(districtId: number | string) {
    return this.areaRepository.getVillages(districtId);
  }

  async getNeighborhoods(villageId: number | string) {
    return this.areaRepository.getNeighborhoods(villageId);
  }
}

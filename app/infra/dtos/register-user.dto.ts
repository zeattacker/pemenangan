export interface RegisterUserDto {
  username: string;
  password: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  group: string;
  districtId: number;
  villageId: number;
  neighborhoodId: number;
  votingStationId?: number;
}
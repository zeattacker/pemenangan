export interface ManageUserDto {
  username?: string;
  password?: string;
  fullName: string;
  phoneNumber: string;
  group: string;
  districtId: number;
  villageId?: number;
  votingStationId?: number;
  isActive: boolean;
}

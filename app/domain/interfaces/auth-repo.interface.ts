import { ObjectResponse } from "~/infra/dtos/object-response.dto";
import type { Credentials } from "../value-objects/credentials.vo";
import { User } from "../entities/user.entity";

export interface IAuthRepository {
  login(
    credentials: Credentials
  ): Promise<{ accessToken: string; refreshToken: string }>;
  refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
  validate(accessToken: string): Promise<User>;
}

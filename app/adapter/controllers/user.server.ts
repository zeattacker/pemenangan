import { RegisterUserUseCase } from "~/application/use-cases/auth/register-user.use-case";
import { GetUserDataUseCase } from "~/application/use-cases/get-user-data.use-case";
import { CreateUserUseCase } from "~/application/use-cases/users/create-user.use-case";
import { DeleteUserUseCase } from "~/application/use-cases/users/delete-user.use-case";
import { FindUserUseCase } from "~/application/use-cases/users/find-user.use-case";
import { UpdateUserUseCase } from "~/application/use-cases/users/update-user.use-case";
import { ManageUserDto } from "~/infra/dtos/manage-user.dto";
import { RegisterUserDto } from "~/infra/dtos/register-user.dto";
import { ApiUserRepository } from "~/infra/repositories/api-user.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const userRepository = new ApiUserRepository(API_BASE_URL);
const sessionRepository = new RemixSessionRepository();
const getUserDataUseCase = new GetUserDataUseCase(
  userRepository,
  sessionRepository
);
const registerUseCase = new RegisterUserUseCase(userRepository);
const createUserCase = new CreateUserUseCase(userRepository, sessionRepository);
const updateUserUseCase = new UpdateUserUseCase(
  userRepository,
  sessionRepository
);
const deleteUserUC = new DeleteUserUseCase(userRepository, sessionRepository);
const findUserUC = new FindUserUseCase(userRepository, sessionRepository);

export async function getUsers(request: Request) {
  return getUserDataUseCase.getUsers(request.headers.get("Cookie"));
}

export async function getUserById(userId: number | string, request: Request) {
  return getUserDataUseCase.getUserById(userId, request.headers.get("Cookie"));
}

export async function manageUser(formData: FormData, request: Request) {
  const id = formData.get("id")?.toString() || "";
  const username = formData.get("username")?.toString() || "";
  const fullName = formData.get("fullname")?.toString() || "";
  const districtId = formData.get("districtId")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const group = formData.get("group")?.toString() || "";
  const neighborhoodId = formData.get("neighborhoodId")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const phoneNumber = formData.get("phoneNumber")?.toString() || "";
  const villageId = formData.get("villageId")?.toString() || "";
  const votingStationId = formData.get("votingStationId")?.toString() || "";
  const isActive = formData.get("isActive")?.toString() || "";

  const userData: ManageUserDto = {
    username,
    fullName,
    districtId: +districtId,
    email,
    group,
    neighborhoodId: +neighborhoodId,
    password,
    phoneNumber: phoneNumber,
    villageId: +villageId,
    votingStationId: +votingStationId,
    isActive: isActive == "true",
  };

  if (userData.votingStationId == 0) delete userData.votingStationId;
  if (userData.neighborhoodId == 0) delete userData.neighborhoodId;
  if (userData.villageId == 0) delete userData.villageId;

  if (id == "") {
    return createUserCase.execute(userData, request.headers.get("Cookie"));
  } else {
    delete userData.password;
    delete userData.username;
    return updateUserUseCase.execute(
      userData,
      id,
      request.headers.get("Cookie")
    );
  }
}

export async function registerUser(formData: FormData) {
  const fullName = formData.get("fullName")?.toString() || "";
  const username = formData.get("username")?.toString() || "";
  const phoneNumber = formData.get("phoneNumber")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const group = formData.get("group")?.toString() || "";
  const districtId = formData.get("districtId")?.toString() || "";
  const villageId = formData.get("villageId")?.toString() || "";
  const neighborhoodId = formData.get("neighborhoodId")?.toString() || "";
  const votingStationId = formData.get("votingStationId")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const userData: RegisterUserDto = {
    fullName,
    username,
    phoneNumber: "62" + phoneNumber,
    email,
    group,
    districtId: +districtId,
    villageId: +villageId,
    neighborhoodId: +neighborhoodId,
    votingStationId: +votingStationId,
    password,
  };

  if (userData.votingStationId == 0) delete userData.votingStationId;

  return registerUseCase.execute(userData);
}

export async function deleteUser(userId: number | string, request: Request) {
  return deleteUserUC.execute(userId, request.headers.get("Cookie"));
}

export async function getDptById(userId: number | string, request: Request) {
  return findUserUC.execute(userId, request.headers.get("Cookie"));
}

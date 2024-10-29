import { json, redirect } from "@remix-run/node";
import { GetCurrentUserUseCase } from "~/application/use-cases/auth/get-current-user.use-case";
import { LoginUseCase } from "~/application/use-cases/auth/login.use-case";
import { LogoutUseCase } from "~/application/use-cases/auth/logout.use-case";
import { TokenExpiredError } from "~/domain/errors/token-expired.error";
import { ApiAuthRepository } from "~/infra/repositories/api-auth.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_URL = process.env.REMIX_API_BASE_URL;

const authRepository = new ApiAuthRepository(API_URL);
const sessionRepository = new RemixSessionRepository();
const loginUseCase = new LoginUseCase(authRepository, sessionRepository);
const logoutUseCase = new LogoutUseCase(sessionRepository);
const validateUseCase = new GetCurrentUserUseCase(
  sessionRepository,
  authRepository
);

export async function handleLogin(username: string, password: string) {
  try {
    const { cookieHeader } = await loginUseCase.execute(username, password);

    return redirect("/panel/dashboard", {
      headers: {
        "Set-Cookie": cookieHeader,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: error.message }, { status: 400 });
    }
    return json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function validateUser(request: Request) {
  try {
    return validateUseCase.execute(request.headers.get("Cookie")!);
    // return user;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // Both access token and refresh token have expired
      return redirect("/", {
        headers: {
          "Set-Cookie": await sessionRepository.destroySession(
            request.headers.get("Cookie")!
          ),
        },
      });
    }
    console.error("Failed to get current user:", error);
    return null;
  }
}

export async function logout(request: Request) {
  try {
    return logoutUseCase.execute(request);
  } catch (err) {
    console.log(err);
  }
}

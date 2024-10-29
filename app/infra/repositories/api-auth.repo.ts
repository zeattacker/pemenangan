import type { IAuthRepository } from "~/domain/interfaces/auth-repo.interface";
import type { Credentials } from "~/domain/value-objects/credentials.vo";
import { TokenExpiredError } from "~/domain/errors/token-expired.error";

export class ApiAuthRepository implements IAuthRepository {
  constructor(private apiUrl: string) {}

  async login(credentials: Credentials) {
    const response = await fetch(`${this.apiUrl}/auths/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error(error.errors[0].detail || "Login failed");
    }

    const data = (await response.json()).data;

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }

  async validate(accessToken: string) {
    const response = await fetch(`${this.apiUrl}/auths/validate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = (await response.json()).data;

    return data;
  }

  async refreshToken(refreshToken: string) {
    const response = await fetch(`${this.apiUrl}/auths/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new TokenExpiredError("Refresh token expired");
    }

    const { data } = await response.json();
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }
}

import { createCookieSessionStorage } from "@remix-run/node";
import type {
  ISessionRepository,
  SessionData,
} from "~/domain/interfaces/session-repo.interface";

export class RemixSessionRepository implements ISessionRepository {
  private sessionStorage;

  constructor() {
    this.sessionStorage = createCookieSessionStorage({
      cookie: {
        name: "__session",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
        sameSite: "lax",
        secrets: [process.env.SESSION_SECRET!],
        secure: process.env.NODE_ENV === "production",
      },
    });
  }

  async getSession(cookieHeader?: string): Promise<SessionData | null> {
    const session = await this.sessionStorage.getSession(cookieHeader);
    const accessToken = session.get("accessToken");
    const refreshToken = session.get("refreshToken");

    if (!accessToken || !refreshToken) {
      return null;
    }

    return { accessToken, refreshToken };
  }

  async createSession(data: SessionData): Promise<string> {
    const session = await this.sessionStorage.getSession();
    session.set("accessToken", data.accessToken);
    session.set("refreshToken", data.refreshToken);

    return this.sessionStorage.commitSession(session);
  }

  async updateSession(
    cookieHeader: string,
    data: SessionData
  ): Promise<string> {
    const session = await this.sessionStorage.getSession(cookieHeader);
    session.set("accessToken", data.accessToken);
    session.set("refreshToken", data.refreshToken);

    return this.sessionStorage.commitSession(session);
  }

  async destroySession(cookieHeader: string): Promise<string> {
    const session = await this.sessionStorage.getSession(cookieHeader);
    return this.sessionStorage.destroySession(session);
  }

  async getAccessToken(cookieHeader?: string): Promise<string | null> {
    const session = await this.getSession(cookieHeader);
    return session ? session.accessToken : null;
  }

  async getRefreshToken(cookieHeader?: string): Promise<string | null> {
    const session = await this.getSession(cookieHeader);
    return session ? session.refreshToken : null;
  }
}

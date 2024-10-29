export interface SessionData {
  accessToken: string;
  refreshToken: string;
}

export interface ISessionRepository {
  getSession(
    cookieHeader?: string | null
  ): Promise<{ accessToken: string; refreshToken: string } | null>;
  createSession(data: {
    accessToken: string;
    refreshToken: string;
  }): Promise<string>;
  updateSession(
    cookieHeader: string,
    data: { accessToken: string; refreshToken: string }
  ): Promise<string>;
  destroySession(cookieHeader: string): Promise<string>;
  getAccessToken(cookieHeader?: string | null): Promise<string | null>;
  getRefreshToken(cookieHeader?: string): Promise<string | null>;
}

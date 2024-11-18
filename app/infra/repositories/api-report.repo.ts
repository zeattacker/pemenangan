import { IReportRepository } from "~/domain/interfaces/report-repo.interface";

export class ApiReportRepository implements IReportRepository {
  constructor(private apiBaseUrl: string) {}
  async getVoterByRelawan(accessToken: string) {
    const response = await fetch(
      `${this.apiBaseUrl}/reports/voter-each-relawan`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.json();
  }
  async getReportVoter(accessToken: string) {
    const response = await fetch(`${this.apiBaseUrl}/reports/voter`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }

  async getReportRecap(accessToken: string) {
    const response = await fetch(`${this.apiBaseUrl}/reports/recapitulation`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
}

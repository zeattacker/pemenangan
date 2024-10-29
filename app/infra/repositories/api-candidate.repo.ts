import { ICandidateRepository } from "~/domain/interfaces/candidate-repo.interface";
import { ManageCandidateDto } from "~/infra/dtos/manage-candidate.dto";

export class ApiCandidateRepository implements ICandidateRepository {
  constructor(private apiUrl: string) {}

  async createCandidate(candidate: ManageCandidateDto, accessToken: string) {
    try {
      const response = await fetch(`${this.apiUrl}/candidates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(candidate),
      });

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async getCandidates(accessToken: string) {
    const response = await fetch(`${this.apiUrl}/candidates`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  }

  async getCandidateById(candidateId: string | number, accessToken: string) {
    const response = await fetch(`${this.apiUrl}/candidates/${candidateId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  }
  async updateCandidate(
    candidate: ManageCandidateDto,
    candidateId: number | string,
    accessToken: string
  ) {
    const response = await fetch(`${this.apiUrl}/candidates/${candidateId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(candidate),
    });

    const data = await response.json();

    return data;
  }

  async deleteCandidate(candidateId: string | number, accessToken: string) {
    const response = await fetch(`${this.apiUrl}/candidates/${candidateId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.text();
  }
}

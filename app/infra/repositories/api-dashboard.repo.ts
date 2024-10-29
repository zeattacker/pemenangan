import { IDashboardRepository } from "~/domain/interfaces/dashboard-repo.interface";

export class ApiDashboardRepository implements IDashboardRepository {
  constructor(private apiUrl: string) {}
  
  async getDashboard(acessToken: string) {
    try {
      const response = await fetch(`${this.apiUrl}/dashboard`, {
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      });

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }
}

import { GetDPTUseCase } from "~/application/use-cases/dpt/get-dpt.use-case";
import { DPT } from "~/domain/entities/dpt.entity";
import { ApiDPTRepository } from "~/infra/repositories/api-dpt.repo";
import { RemixSessionRepository } from "~/infra/session/remix-session.repo";

const API_BASE_URL = process.env.REMIX_API_BASE_URL;

const dptRepository = new ApiDPTRepository(API_BASE_URL);
const sessionRepository = new RemixSessionRepository();
const getDptUseCase = new GetDPTUseCase(dptRepository, sessionRepository);

export async function getDPTs(
  query: {
    name: string;
    page: string;
    limit: string;
  },
  request: Request,
  type: string = "normal"
) {
  const dpts = await getDptUseCase.execute(
    query,
    request.headers.get("Cookie") || ""
  );
  if (type == "select") {
    const data = dpts?.data.map((dpt: DPT) => {
      return {
        value: dpt.id.toString(),
        label: `${dpt.name} - RT${dpt.rt} - RW${dpt.rw}`,
      };
    });

    return {
      data,
      meta: dpts?.meta,
    };
  } else {
    return dpts;
  }
}

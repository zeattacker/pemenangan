import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getCandidates } from "~/adapter/controllers/candidate.server";
import { Candidate } from "~/domain/entities/candidate.entity";
import { PaginationResponseDto } from "~/infra/dtos/pagination-response.dto";
import CandidatePage from "~/presentation/candidates/candidate-page";

export async function loader({ request }: LoaderFunctionArgs) {
  const candidates = (await getCandidates(request)) as PaginationResponseDto<
    Candidate[]
  >; //1 for mojokerto
  return json({ ...candidates });
}
export default CandidatePage;

import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
  getRecapReport,
  getVoterReport,
} from "~/adapter/controllers/report.server";
import DetailReportPage from "~/presentation/report/detail-report-page";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { tabValue } = params;
  let voterReports;
  let recapReports;

  if (tabValue == "data") {
    voterReports = await getVoterReport(request);
  } else if (tabValue == "recap") {
    recapReports = await getRecapReport(request);
  }

  return json({ voterReports, recapReports });
}

export default DetailReportPage;

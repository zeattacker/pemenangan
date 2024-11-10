import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getVoterReport } from "~/adapter/controllers/report.server";
import DetailReportPage from "~/presentation/report/detail-report-page";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { tabValue } = params;
  let voterReports;

  if (tabValue == "data") {
    voterReports = await getVoterReport(request);
  } else if(tabValue == "recap") {
    //
  }

  return json({ voterReports });
}

export default DetailReportPage;

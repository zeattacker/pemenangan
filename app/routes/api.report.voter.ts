import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getRelawanByVoter } from "~/adapter/controllers/report.server";
import _ from "lodash";
import {
  VoterByRelawan,
  VoterDetail,
} from "~/domain/entities/voter-by-relawan.entity";
import * as XLSX from "xlsx";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const reports = await getRelawanByVoter(request);

    //data dpt
    const formattedReports = await transformData(reports || []);
    // console.log();

    //data perolehan per relawan
    const coordinatorSummary = _.map(reports, (item: VoterByRelawan) => ({
      nama_relawan: item.name,
      no_handphone: item.phoneNumber,
      kecamatan: item.village.district.name,
      kelurahan: item.village.district.name,
      total_dpt: item.voterCount,
    }));

    // Buat workbook Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedReports);

    // Tambahkan worksheet ke workbook
    XLSX.utils.book_append_sheet(wb, ws, "DATA DPT");

    //sheet per relawan
    const ws2 = XLSX.utils.json_to_sheet(coordinatorSummary);
    XLSX.utils.book_append_sheet(wb, ws2, "PEROLEHAN RELAWAN");

    // Generate buffer
    const excelBuffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    // Set headers untuk download
    return new Response(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="rekap_mokerta.xlsx"`,
      },
    });

    return json({ data: formattedReports.slice(0, 4), status: true });
  } catch (err) {
    console.log(err);
    return json({ data: null, status: false });
  }
}

async function transformData(jsonData: VoterByRelawan[]) {
  return _.flatMap(jsonData, (item: VoterByRelawan) => {
    return _.map(item.voters, (voter: VoterDetail) => ({
      nama_dpt: voter.name,
      rt: voter.rt,
      rw: voter.rw,
      tps: voter.votingStationName,
      nama_relawan: item.name,
      no_handphone: item.phoneNumber,
      kecamatan: item.village.district.name,
      kelurahan: item.village.name,
    }));
  });
}

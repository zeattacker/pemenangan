import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
  getDistrictsSelect,
  getNeighborhoodsSelect,
} from "~/adapter/controllers/area.server";
import { getDPTs } from "~/adapter/controllers/dpt.server";
import { getTps, getTpsSelect } from "~/adapter/controllers/tps.server";
import { getVillages } from "~/adapter/controllers/village.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const type = url.searchParams.get("type");
  const page = url.searchParams.get("page") || "1";
  const limit = url.searchParams.get("limit") || "10";

  if (!query) {
    return json({ error: "query is required" }, { status: 400 });
  }

  if (!type) {
    return json({ error: "type is required" }, { status: 400 });
  }

  try {
    if (type == "villages") {
      const villages = await getVillages(query!, request, "select");
      return json(villages?.data ? [...villages.data] : []);
    } else if (type == "districts") {
      return json([...(await getDistrictsSelect(query)).data]);
    } else if (type == "neighborhoods") {
      return json([...(await getNeighborhoodsSelect(query)).data]);
    } else if (type == "tps") {
      const tps = await getTps(query, request, "select");
      return json(tps?.data ? [...tps.data] : []);
    } else if (type == "dpt") {
      const dpts = await getDPTs(
        { name: query, page, limit },
        request,
        "select"
      );

      return json(dpts?.data ? [...dpts.data] : []);
    } else {
      return json({});
    }
  } catch (error) {
    console.error("Error fetching area:", error);
    return json({ error: "Failed to fetch" }, { status: 500 });
  }
}

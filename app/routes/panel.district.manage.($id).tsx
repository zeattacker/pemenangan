import { ActionFunctionArgs, json } from "@remix-run/node";
import { manageDistrict } from "~/adapter/controllers/district.server";
import { ErrorResponseDto } from "~/infra/dtos/error-response.dto";
import ManageDistrictPage from "~/presentation/districts/manage-district-page";

// export async function loader({ request, params }: LoaderFunctionArgs) {
//   const id = params.id;
//   let district = null;
//   if (id) {
//     district = (await getDistrictById(id, request))?.data;
//   }

//   return json({ district });
// }

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const district = await manageDistrict(formData, request);
    // if ("errors" in dpt!) throw dpt;

    return json({ success: true, data: { ...district?.data } });
  } catch (error) {
    return json(
      {
        success: false,
        data: null,
        error: (error as ErrorResponseDto).errors[0].detail,
      },
      { status: 400 }
    );
  }
}

export default ManageDistrictPage;

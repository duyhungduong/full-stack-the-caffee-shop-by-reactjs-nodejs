import SummaryApi from "../../common";
import { toast } from "react-toastify";

const addToBooking = async (e, id, at, et, n) => {
  e?.stopPropagation();
  e?.preventDefault();

  const response = await fetch(SummaryApi.bookingTable.url, {
    method: SummaryApi.bookingTable.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      tableId: id,
      arrivalTime: at,
      endTime: et,
      notes: n,
    }),
  });

  const responseData = await response.json();

  if (responseData.success) {
    toast.success(responseData.message);
  }

  if (responseData.error) {
    toast.error(responseData.message);
  }

  return responseData;
};
export default addToBooking;

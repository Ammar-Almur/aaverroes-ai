import { AxiosError } from "axios";
import { httpCode } from "../data";
import { enqueueSnackbar } from "notistack";

const errorCache: { [key: string]: number } = {};
export const handleApiError = async (
  error: AxiosError<{
    message?: string;
    code: string;
    status: number;
  }>,
  isQueryRequest?: boolean,
  withoutNotification?: boolean
) => {
  console.log("error", error);

  // this is not a pure function and it is ok since it will be used only in the context of this app
  if (error.response?.status === httpCode.UNAUTHORIZED) {
    // if authorized then logout
  } else if (error.response && !withoutNotification) {
    const errorMessage = error?.message;
    const canShowNotification =
      Date.now() - (errorCache[error?.message ?? ""] ?? 0) > 30 * 1000;
    if (
      typeof window !== "undefined" &&
      canShowNotification &&
      isQueryRequest
    ) {
      errorCache[error?.message || ""] = Date.now();
      enqueueSnackbar(errorMessage, { variant: "error" });
    } else if (!isQueryRequest) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }
};

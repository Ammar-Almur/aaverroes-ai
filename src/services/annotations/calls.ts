import { apiEndpoints } from "@/src/data";
import { BackendClient } from "@/src/lib";

import { handleApiError } from "@/src/utils";
import { AnnotationPayload, AnnotationType } from "./types";

enum queryKeys {
  annotations = "annotations",
  create = "create",
  delete = "delete",
}

/**
 * @description function call handler in "/images/:imageId/annotation" api route with "get" method to fetch image annotations.
 * @param props image id
 * @returns list of annotations or error if failed
 */
const getImageAnnotationsRequest = ({
  imageId,
}: {
  imageId: number | string;
}): Promise<AnnotationType[]> => {
  return BackendClient.get(
    apiEndpoints.images + "/" + imageId + apiEndpoints.annotations
  )
    .then((res) => res?.data)
    .catch((e) => {
      handleApiError(e, true);
      throw e.response?.data;
    });
};
export const getImageAnnotationsQuery = ({
  imageId,
}: {
  imageId: number | string;
}) => ({
  queryKey: [queryKeys.annotations, imageId],
  queryFn: () => getImageAnnotationsRequest({ imageId }),
  refetchOnWindowFocus: false,
});

/** ****************************************************** */
/**
 * @description function calls handler in "/annotations" api route with "post" method to create annotation.
 * @params body
 * @returns created annotation details or error if failed
 */
const createAnnotationRequest = ({ body }: { body: AnnotationPayload }) =>
  BackendClient.post(apiEndpoints.annotations, body)
    .then((res) => res.data)
    .catch((err) => {
      handleApiError(err);
      throw err;
    });

export const createAnnotationMutation = () => ({
  mutationKey: [queryKeys.create],
  mutationFn: ({ body }: { body: AnnotationPayload }) =>
    createAnnotationRequest({ body }),
});

/** ****************************************************** */
/**
 * @description function calls handler in "/annotations/:id" api route with "delete" method to delete annotation.
 * @params "id"
 * @returns deleted annotation details or error if failed
 */
const deleteAnnotationRequest = ({ id }: { id: number }) =>
  BackendClient.delete(apiEndpoints.annotations + "/" + id)
    .then((res) => res.data)
    .catch((err) => {
      handleApiError(err);
      throw err;
    });

export const deleteAnnotationMutation = () => ({
  mutationKey: [queryKeys.delete],
  mutationFn: ({ id }: { id: number }) => deleteAnnotationRequest({ id }),
});

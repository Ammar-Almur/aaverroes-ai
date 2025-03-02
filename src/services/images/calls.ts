import { apiEndpoints } from "@/src/data";
import { BackendClient } from "@/src/lib";
import { ImagePayload, getImagesQueryProps, ImageType } from "./types";
import { handleApiError } from "@/src/utils";

enum queryKeys {
  images = "images",
  image = "image",
  create = "create",
  update = "update",
  delete = "delete",
}
/** ****************************************************** */
/**
 * @description function call handler in "/images" api route with "get" method to fetch images.
 * @param props
 * @returns list of images or error if failed
 */
const getImagesRequest = (props: getImagesQueryProps): Promise<ImageType[]> => {
  const { filters } = props;
  return BackendClient.get(apiEndpoints.images, {
    params: {
      name: filters?.search,
      "metadata.size": filters?.size,
      "metadata.resolution": filters?.resolution,
      categoryId: filters?.category,
    },
  })
    .then((res) => res?.data)
    .catch((e) => {
      handleApiError(e, true);
      throw e.response?.data;
    });
};
export const getImagesQuery = (props: getImagesQueryProps) => ({
  queryKey: [queryKeys.images, props?.filters],
  queryFn: () => getImagesRequest(props),
  refetchOnWindowFocus: false,
  initialPageParam: 1,
  // if the last loaded page from pagination pages is less than the pagination page count set next page is last page +1
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getNextPageParam: (lastPage: any) =>
    lastPage?.pagination?.page < lastPage?.pagination?.pageCount
      ? lastPage.pagination.page + 1
      : null,
});
/** ****************************************************** */
/**
 * @description function call handler in "/images/:id" api route with "get" method to fetch image.
 * @param  "id"
 * @returns  image or error if failed
 */
const getImageRequest = ({
  id,
}: {
  id: number | string;
}): Promise<ImageType> => {
  return BackendClient.get(apiEndpoints.images + "/" + id)
    .then((res) => res?.data)
    .catch((e) => {
      handleApiError(e, true);
      throw e.response?.data;
    });
};
export const getImageQuery = ({ id }: { id: number | string }) => ({
  queryKey: [queryKeys.image, id],
  queryFn: () => getImageRequest({ id }),
  refetchOnWindowFocus: false,
});
/** ****************************************************** */
/**
 * @description function calls handler in "/images" api route with "post" method to create image.
 * @params body
 * @returns created image details or error if failed
 */
const createImageRequest = ({ body }: { body: ImagePayload }) =>
  BackendClient.post(apiEndpoints.images, body)
    .then((res) => res.data)
    .catch((err) => {
      handleApiError(err);
      throw err;
    });

export const createImageMutation = () => ({
  mutationKey: [queryKeys.create],
  mutationFn: ({ body }: { body: ImagePayload }) =>
    createImageRequest({ body }),
});

/** ****************************************************** */
/**
 * @description function calls handler in "/images/:id" api route with "put" method to update image.
 * @params body,id
 * @returns updated image details or error if failed
 */
const updateImageRequest = ({ body, id }: { body: ImagePayload; id: number }) =>
  BackendClient.put(apiEndpoints.images + "/" + id, body)
    .then((res) => res.data)
    .catch((err) => {
      handleApiError(err);
      throw err;
    });

export const updateImageMutation = () => ({
  mutationKey: [queryKeys.update],
  mutationFn: ({ body, id }: { body: ImagePayload; id: number }) =>
    updateImageRequest({ body, id }),
});
/** ****************************************************** */
/**
 * @description function calls handler in "/images/:id" api route with "delete" method to delete image.
 * @params "id"
 * @returns deleted image details or error if failed
 */
const deleteImageRequest = ({ id }: { id: number }) =>
  BackendClient.delete(apiEndpoints.images + "/" + id)
    .then((res) => res.data)
    .catch((err) => {
      handleApiError(err);
      throw err;
    });

export const deleteImageMutation = () => ({
  mutationFn: ({ id }: { id: number }) => deleteImageRequest({ id }),
});

import { apiEndpoints } from "@/src/data";
import { BackendClient } from "@/src/lib";
import {
  CategoryPayload,
  CategoryType,
  getCategoriesQueryProps,
} from "./types";
import { handleApiError } from "@/src/utils";

enum queryKeys {
  categories = "categories",
  category = "category",
  create = "create",
  update = "update",
  delete = "delete",
}

/**
 * @description function call handler in "/categories" api route with "get" method to fetch categories.
 * @param props
 * @returns list of categories or error if failed
 */
const getCategoriesRequest = (
  props: getCategoriesQueryProps
): Promise<CategoryType[]> => {
  const { filters } = props;
  return BackendClient.get(apiEndpoints.categories, {
    params: {
      name: filters?.search,
    },
  })
    .then((res) => res?.data)
    .catch((e) => {
      handleApiError(e, true);
      throw e.response?.data;
    });
};
export const getCategoriesQuery = (props: getCategoriesQueryProps) => ({
  queryKey: [queryKeys.categories, props?.filters],
  queryFn: () => getCategoriesRequest(props),
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
 * @description function call handler in "/categories/:id" api route with "get" method to fetch category.
 * @param 'id'
 * @returns category or error if failed
 */
const getCategoryRequest = ({ id }: { id: number }): Promise<CategoryType> => {
  return BackendClient.get(apiEndpoints.categories + "/" + id)
    .then((res) => res?.data)
    .catch((e) => {
      handleApiError(e, true, true);
      throw e.response?.data;
    });
};
export const getCategoryQuery = ({ id }: { id: number }) => ({
  queryKey: [queryKeys.category, id],
  queryFn: () => getCategoryRequest({ id }),
  refetchOnWindowFocus: false,
});

/** ****************************************************** */
/**
 * @description function calls handler in "/categories" api route with "post" method to create category.
 * @params body
 * @returns created category details or error if failed
 */
const createCategoryRequest = ({ body }: { body: CategoryPayload }) =>
  BackendClient.post(apiEndpoints.categories, body)
    .then((res) => res.data)
    .catch((err) => {
      handleApiError(err);
      throw err;
    });

export const createCategoryMutation = () => ({
  mutationKey: [queryKeys.create],
  mutationFn: ({ body }: { body: CategoryPayload }) =>
    createCategoryRequest({ body }),
});

/** ****************************************************** */
/**
 * @description function calls handler in "/categories/:id" api route with "put" method to update category.
 * @params body,id
 * @returns updated category details or error if failed
 */
const updateCategoryRequest = ({
  body,
  id,
}: {
  body: CategoryPayload;
  id: number;
}) =>
  BackendClient.put(apiEndpoints.categories + "/" + id, body)
    .then((res) => res.data)
    .catch((err) => {
      handleApiError(err);
      throw err;
    });

export const updateCategoryMutation = () => ({
  mutationKey: [queryKeys.update],
  mutationFn: ({ body, id }: { body: CategoryPayload; id: number }) =>
    updateCategoryRequest({ body, id }),
});
/** ****************************************************** */
/**
 * @description function calls handler in "/categories/:id" api route with "delete" method to delete category.
 * @params "id"
 * @returns deleted category details or error if failed
 */
const deleteCategoryRequest = ({ id }: { id: number }) =>
  BackendClient.delete(apiEndpoints.categories + "/" + id)
    .then((res) => res.data)
    .catch((err) => {
      handleApiError(err);
      throw err;
    });

export const deleteCategoryMutation = () => ({
  mutationKey: [queryKeys.delete],
  mutationFn: ({ id }: { id: number }) => deleteCategoryRequest({ id }),
});

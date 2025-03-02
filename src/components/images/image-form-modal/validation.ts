import { CategoryType } from "@/src/services/categories";
import { FileType } from "@/src/services/images";
import * as yup from "yup";

export const useFormSchema = () => {
  const formSchema = yup
    .object({
      file: yup.mixed<FileType>().required().nullable(),
      category: yup.mixed<CategoryType>().required(),
    })
    .required();

  return { formSchema };
};

export type Form = yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;

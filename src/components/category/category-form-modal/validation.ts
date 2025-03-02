import * as yup from "yup";

export const useFormSchema = () => {
  const formSchema = yup
    .object({
      name: yup.string().required(),
      description: yup.string().required(),
      image: yup.string().required(),
    })
    .required();

  return { formSchema };
};

export type Form = yup.InferType<
  ReturnType<typeof useFormSchema>["formSchema"]
>;

import type { Form } from "./validation";
import { CategoryPayload, CategoryType } from "@/src/services/categories";

/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): CategoryPayload => {
  return {
    name: input.name,
    description: input.description,
    image: input.image,
  };
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */
export const deserializer = (data: CategoryType): Form => {
  const { ...rest } = data!;
  return {
    ...rest,
  };
};

import type { Form } from "./validation";
import { ImagePayload, ImageType } from "@/src/services/images";

/**
 * Description
 * - determine how data will be processed and formatted for the back-end
 */
export const serializer = (input: Form): ImagePayload => {
  return {
    categoryId: input.category?.id,
    name: input.file?.name,
    url: input.file?.url,
    uploadDate: input.file?.uploadDate,
    metadata: {
      resolution: input.file?.metadata.resolution,
      size: input.file?.metadata.size,
    },
  };
};

/**
 * Description
 * - determine how data will be processed and formatted for the front-end
 */
export const deserializer = (data: ImageType): Form => {
  const { ...rest } = data!;
  return {
    category: {
      id: data.categoryId!,
      name: "",
      description: "",
      image: "",
    },
    file: rest,
  };
};

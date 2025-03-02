export type AnnotationType = {
  id?: number;
  imageId?: number;
  type?: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  color: string;
};

export type AnnotationPayload = {
  imageId: number;
  type: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  color: string;
};

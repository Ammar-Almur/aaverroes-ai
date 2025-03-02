export type Filter = {
  search?: string | null;
  size?: string | null;
  category?: string | null;
  resolution?: string | null;
};
export interface getImagesQueryProps {
  filters?: Filter;
}

export type ImageType = {
  id: number;
  name: string;
  url: string;
  uploadDate: string;
  metadata: {
    size: string;
    resolution: string;
  };
  categoryId: number | undefined;
};
export type ImagePayload = {
  name: string | undefined;
  url: string | null | undefined;
  uploadDate: string | undefined;
  metadata: {
    size: string | undefined;
    resolution: string | undefined;
  };
  categoryId: number | undefined;
};

export type FileType = {
  url?: string | undefined;
  name?: string | undefined;
  uploadDate?: string | undefined;
  metadata: {
    size?: string | undefined;
    resolution?: string | undefined;
  };
};

export type Filter = {
  search?: string | null;
};
export interface getCategoriesQueryProps {
  filters?: Filter;
}

export type CategoryType = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type CategoryPayload = {
  name: string;
  description: string;
  image: string;
};

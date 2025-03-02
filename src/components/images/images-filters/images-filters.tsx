import {
  Autocomplete,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getImagesQuery } from "@/src/services/images";
import { CategoryType, getCategoriesQuery } from "@/src/services/categories";

function ImagesFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data } = useQuery({ ...getImagesQuery({}) });
  const { data: categories } = useQuery({ ...getCategoriesQuery({}) });
  const removeDuplicatesAndSort = (array: string[]) => {
    return [...new Set(array)].sort();
  };

  const resolutions = removeDuplicatesAndSort(
    data?.map((i) => i.metadata.resolution) ?? []
  );
  const sizes = removeDuplicatesAndSort(
    data?.map((i) => i.metadata.size) ?? []
  );

  const setFilter = (name: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(name, value);

    router.push(`?${newParams.toString()}`);
  };

  const deleteFilter = (name: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete(name);

    router.push(`?${newParams.toString()}`);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setFilter("search", event.target.value);
    else deleteFilter("search");
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSizeChange = (event: any, newValue: string | null) => {
    if (newValue) setFilter("size", newValue);
    else deleteFilter("size");
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResolutionChange = (event: any, newValue: string | null) => {
    if (newValue) setFilter("resolution", newValue);
    else deleteFilter("resolution");
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCategoryChange = (event: any, newValue: CategoryType | null) => {
    if (newValue) setFilter("category", `${newValue.id}`);
    else deleteFilter("category");
  };
  return (
    <Stack direction={"row"} gap={"10px"} flexWrap={"wrap"}>
      <FormControl sx={{ m: 1, width: 300 }} variant="standard">
        <InputLabel htmlFor="standard-adornment-search">Search</InputLabel>
        <Input
          id="standard-adornment-search"
          type={"text"}
          onChange={handleSearchChange}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Autocomplete
        disablePortal
        options={sizes}
        sx={{ m: 1, width: 150 }}
        renderInput={(params) => (
          <TextField {...params} label="Size" variant="standard" />
        )}
        onChange={handleSizeChange}
        value={searchParams.get("size") ?? ""}
      />
      <Autocomplete
        disablePortal
        options={resolutions}
        sx={{ m: 1, width: 150 }}
        renderInput={(params) => (
          <TextField {...params} label="Resolution" variant="standard" />
        )}
        onChange={handleResolutionChange}
        value={searchParams.get("resolution") ?? ""}
      />
      <Autocomplete
        disablePortal
        getOptionLabel={(option) => option.name}
        options={categories ?? []}
        sx={{ m: 1, width: 150 }}
        renderInput={(params) => (
          <TextField {...params} label="Category" variant="standard" />
        )}
        onChange={handleCategoryChange}
        value={
          categories?.find((i) => `${i.id}` === searchParams.get("category")) ??
          null
        }
      />
    </Stack>
  );
}

export default ImagesFilters;

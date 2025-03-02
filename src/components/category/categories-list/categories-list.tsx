import { getCategoriesQuery } from "@/src/services/categories";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { CategoryCard } from "../category-card";

function CategoriesList() {
  const { data } = useQuery(getCategoriesQuery({}));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {data?.map((category) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={category.id}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CategoriesList;

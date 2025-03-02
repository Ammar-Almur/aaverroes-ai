"use client";
import { CategoriesList } from "@/src/components/category/categories-list";
import { CategoryFormModal } from "@/src/components/category/category-form-modal";
import { Box, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" color="primary">
          Categories
        </Typography>
        <Box>
          <CategoryFormModal type="create" />
        </Box>
      </Stack>
      <Box mt={4}>
        <CategoriesList />
      </Box>
    </Box>
  );
}

"use client";
import ImageGallery from "@/src/components/images/images-gallery/images-gallery";
import { Box, Stack, Typography } from "@mui/material";

import { ImagesFilters } from "@/src/components/images/images-filters";
import { ImageFormModal } from "@/src/components/images/image-form-modal";
import { Suspense } from "react";
export default function Home() {
  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" color="primary">
          Images
        </Typography>
        <Box>
          <ImageFormModal type="create" />
        </Box>
      </Stack>
      <Suspense fallback={<div>Loading...</div>}>
        <ImagesFilters />
      </Suspense>
      <Box mt={4}>
        <Suspense fallback={<div>Loading...</div>}>
          <ImageGallery />
        </Suspense>
      </Box>
    </Box>
  );
}

"use client";
import ImageGallery from "@/src/components/images/images-gallery/images-gallery";
import { Box,  Stack, Typography } from "@mui/material";

import { ImagesFilters } from "@/src/components/images/images-filters";
import { ImageFormModal } from "@/src/components/images/image-form-modal";
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
      <ImagesFilters />
      <Box mt={4}>
        <ImageGallery />
      </Box>
    </Box>
  );
}

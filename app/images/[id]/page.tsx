import { Box, Stack, Typography } from "@mui/material";
import { DrawImageAnnotations } from "@/src/components/images/drawer-image-annotation";
export default function Image({ params }: { params: { id: string } }) {
  const id = params?.id;

  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" color="primary">
          Images Details
        </Typography>
      </Stack>
      <Box mt={4}>
        <DrawImageAnnotations id={id} />
      </Box>
    </Box>
  );
}

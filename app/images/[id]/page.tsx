import { Box, Stack, Typography } from "@mui/material";
import { DrawImageAnnotations } from "@/src/components/images/drawer-image-annotation";
export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
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
      {id && (
        <Box mt={4}>
          <DrawImageAnnotations id={id} />
        </Box>
      )}
    </Box>
  );
}

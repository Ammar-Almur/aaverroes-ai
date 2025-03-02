import { deleteImageMutation, ImageType } from "@/src/services/images";
import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import { ImageDetailsPopover } from "../image-details-popover";
import GestureIcon from "@mui/icons-material/Gesture";
import classes from "./style.module.css";
import { DeleteConfirmationModal } from "../../common/delete-confirmation-modal";
import { ImageFormModal } from "../image-form-modal";
import Link from "next/link";
import { ROUTES } from "@/src/data";
interface ImageCardProps {
  image: ImageType;
}
function ImageCard(props: ImageCardProps) {
  const { image } = props;

  return (
    <Box className={classes.image}>
      <img
        src={image.url}
        alt={image.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <Box className={classes.imageActions}>
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          bgcolor={"rgba(0, 0, 0, 0.6)"}
        >
          <ImageDetailsPopover image={image} />
          <IconButton
            component={Link}
            href={ROUTES.images.path + "/" + image.id}
            color="light"
          >
            <GestureIcon />
          </IconButton>
          <ImageFormModal type={"update"} imageId={image.id} />
          <DeleteConfirmationModal
            title="Delete Image"
            mutationFunction={deleteImageMutation}
            listQueryKey="images"
            itemName={image.name}
            id={image.id}
            actionColor="light"
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default ImageCard;

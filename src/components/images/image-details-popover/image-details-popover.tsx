import { ImageType } from "@/src/services/images";
import { Box, IconButton, Popover, Stack, Typography } from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/src/data";
import { useQuery } from "@tanstack/react-query";
import { getCategoryQuery } from "@/src/services/categories";
interface ImageDetailsPopoverProps {
  image: ImageType;
}
function ImageDetailsPopover(props: ImageDetailsPopoverProps) {
  const { image } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data } = useQuery({
    ...getCategoryQuery({ id: image.id }),
    enabled: open && !!image.id,
  });

  return (
    <div>
      <IconButton color="light" aria-describedby={id} onClick={handleClick}>
        <InfoIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={1}>
          <Typography variant="h6">{image.name}</Typography>
          {data && (
            <Typography variant="subtitle1" color="textDarkGray">
              {data?.name}
            </Typography>
          )}
          <Stack direction={"row"} flexWrap={"nowrap"} gap={1}>
            <Typography>{image.metadata.resolution}</Typography>
            <Typography>{image.metadata.size}</Typography>
          </Stack>
          <Typography>{dayjs(image.uploadDate).format(DATE_FORMAT)}</Typography>
        </Box>
      </Popover>
    </div>
  );
}

export default ImageDetailsPopover;

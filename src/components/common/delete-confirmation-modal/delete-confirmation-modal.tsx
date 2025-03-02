import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface DeleteConfirmationModalProps {
  id: number;
  title: string;
  itemName: string;
  mutationFunction: () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ id }: { id: number }) => Promise<any>;
  };
  listQueryKey: string;
  actionColor: "error" | "light";
  menuAction?: boolean;
}
function DeleteConfirmationModal(props: DeleteConfirmationModalProps) {
  const {
    mutationFunction,
    listQueryKey,
    itemName,
    title,
    id,
    actionColor,
    menuAction = false,
  } = props;
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate, isPending } = useMutation({
    ...mutationFunction(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey] });
      handleClose();
    },
  });

  const handleDelete = () => {
    mutate({ id });
  };

  return (
    <>
      {menuAction ? (
        <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      ) : (
        <IconButton color={actionColor} onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        slotProps={{
          paper: {
            sx: {
              minWidth: 350,
              pb: 1,
              paddingInlineEnd: 1,
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography component={"span"}>
              Are you sure you want to delete{" "}
              <Typography component={"span"} variant="subtitle2">
                {itemName}
              </Typography>
              ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            Close
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default DeleteConfirmationModal;

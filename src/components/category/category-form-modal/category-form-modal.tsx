import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { FileInput } from "../../common/file-input/file-input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Form, useFormSchema } from "./validation";
import { deserializer, serializer } from "./serializer";
import {
  createCategoryMutation,
  getCategoryQuery,
  updateCategoryMutation,
} from "@/src/services/categories";
import { yupResolver } from "@hookform/resolvers/yup";
interface CategoryFormModalProps {
  type: "create" | "update";
  categoryId?: number;
}
function CategoryFormModal(props: CategoryFormModalProps) {
  const { type, categoryId } = props;
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { data: categoryData } = useQuery({
    ...getCategoryQuery({ id: categoryId! }),
    enabled: !!categoryId && open,
  });

  const { formSchema } = useFormSchema();
  const {
    handleSubmit,
    setValue,
    getFieldState,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(formSchema),
    defaultValues: categoryData ? deserializer(categoryData) : {},
  });
  useEffect(() => {
    if (categoryData) {
      setValue("name", categoryData?.name);
      setValue("description", categoryData?.description);
      setValue("image", categoryData?.image);
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryData]);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const { mutate: create, isPending: loadingCreate } = useMutation({
    ...createCategoryMutation(),
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  const { mutate: update, isPending: loadingUpdate } = useMutation({
    ...updateCategoryMutation(),
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  const isLoading = loadingCreate || loadingUpdate;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSubmit = (data: Form) => {
    if (type === "create") {
      create({
        body: serializer(data),
      });
    }
    if (type === "update" && categoryId) {
      update({
        id: categoryId,
        body: serializer(data),
      });
    }
  };

  return (
    <>
      {type === "create" ? (
        <Button
          fullWidth
          variant="outlined"
          onClick={handleClickOpen}
          endIcon={<AddIcon />}
        >
          Add Category{" "}
        </Button>
      ) : (
        <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit
        </MenuItem>
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
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="alert-dialog-title">
            {type === "create" ? "Add Category" : "Edit Category"}
          </DialogTitle>
          <DialogContent>
            <Stack gap={1}>
              <Stack gap={0}>
                <Typography variant="caption">Name</Typography>
                <TextField
                  label=""
                  variant="outlined"
                  error={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <FormHelperText error>{errors.name.message}</FormHelperText>
                )}
              </Stack>
              <Stack gap={0}>
                <Typography variant="caption">Description</Typography>
                <TextField
                  label=""
                  variant="outlined"
                  error={!!errors.description}
                  {...register("description")}
                />
                {errors.name && (
                  <FormHelperText error>
                    {errors.description?.message}
                  </FormHelperText>
                )}
              </Stack>

              <FileInput
                label={"Image"}
                onComplete={(file) => {
                  setValue("image", file?.url ?? "");
                }}
                onRemove={() => setValue("image", "")}
                error={Boolean(getFieldState("image")?.error) ?? false}
                errorMessage={errors.image?.message}
                reset={open}
                initialFile={
                  watch("image")
                    ? {
                        fileName: "category image",
                        downloadUrl: watch("image") ?? "",
                      }
                    : null
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose} autoFocus>
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              loading={isLoading}
            >
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default CategoryFormModal;

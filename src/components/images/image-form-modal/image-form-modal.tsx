import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { FileInput } from "../../common/file-input/file-input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createImageMutation,
  updateImageMutation,
} from "@/src/services/images";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, useFormSchema } from "./validation";
import { deserializer, serializer } from "./serializer";
import { getCategoriesQuery } from "@/src/services/categories";
import { getImageQuery } from "@/src/services/images/calls";
interface ImageFormModalProps {
  type: "create" | "update";
  imageId?: number;
}
function ImageFormModal(props: ImageFormModalProps) {
  const { type, imageId } = props;
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { data: imageData } = useQuery({
    ...getImageQuery({ id: imageId! }),
    enabled: !!imageId && open,
  });

  const { data } = useQuery(getCategoriesQuery({}));
  const { formSchema } = useFormSchema();
  const {
    handleSubmit,
    setValue,
    getFieldState,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(formSchema),
    defaultValues: imageData ? deserializer(imageData) : {},
  });
  useEffect(() => {
    if (imageData) {
      const category = data?.find(
        (c) => c.id === deserializer(imageData).category.id
      );

      if (category) setValue("category", category);
      setValue("file", deserializer(imageData).file);
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const { mutate: create, isPending: loadingCreate } = useMutation({
    ...createImageMutation(),
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
  const { mutate: update, isPending: loadingUpdate } = useMutation({
    ...updateImageMutation(),
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["images"] });
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
    if (type === "update" && imageId) {
      update({
        id: imageId,
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
          Add Image{" "}
        </Button>
      ) : (
        <IconButton color="light" onClick={handleClickOpen}>
          <EditIcon />
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
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="alert-dialog-title">
            {type === "create" ? "Add Image" : "Edit Image"}
          </DialogTitle>
          <DialogContent>
            <Stack gap={1}>
              <FileInput
                label={"Image"}
                onComplete={(file) => {
                  setValue("file", file);
                }}
                onRemove={() => setValue("file", null)}
                error={Boolean(getFieldState("file")?.error) ?? false}
                errorMessage={errors.file?.message}
                reset={open}
                initialFile={
                  watch("file")
                    ? {
                        fileName: watch("file.name") ?? "",
                        downloadUrl: watch("file.url") ?? "",
                      }
                    : null
                }
              />
              <Controller
                name="category"
                control={control}
                defaultValue={undefined}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Box>
                    <Typography variant="caption">Category</Typography>
                    <Autocomplete
                      options={data ?? []}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                      }}
                      onBlur={onBlur}
                      value={value || null}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          variant="outlined"
                          error={!!errors.category}
                        />
                      )}
                    />
                    {errors.category && (
                      <FormHelperText error>
                        {errors.category.message}
                      </FormHelperText>
                    )}
                  </Box>
                )}
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

export default ImageFormModal;

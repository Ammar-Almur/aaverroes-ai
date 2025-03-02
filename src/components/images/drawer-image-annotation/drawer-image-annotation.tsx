"use client";
import { useEffect, useState } from "react";
import { Stage, Layer, Rect, Image } from "react-konva";
import Grid from "@mui/material/Grid2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getImageQuery } from "@/src/services/images/calls";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/src/data";
import {
  AnnotationType,
  createAnnotationMutation,
  deleteAnnotationMutation,
  getImageAnnotationsQuery,
} from "@/src/services/annotations";
import { DeleteConfirmationModal } from "../../common/delete-confirmation-modal";
interface DrawImageAnnotationsProps {
  id: string;
}
const DrawImageAnnotations = (props: DrawImageAnnotationsProps) => {
  const { id } = props;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [annotations, setAnnotations] = useState<AnnotationType[]>([]);
  const [newAnnotation, setNewAnnotation] = useState<AnnotationType[]>([]);
  const [annotationToAdd, setAnnotationToAdd] = useState<AnnotationType>();
  const [color, setColor] = useState<string>("#000000");
  const [visible, setVisible] = useState<number>();

  const [image] = useState(new window.Image());

  const { data: imageDetails } = useQuery({
    ...getImageQuery({ id: id as string }),
    enabled: !!id,
  });

  const { data: imageAnnotations } = useQuery({
    ...getImageAnnotationsQuery({ imageId: id as string }),
    enabled: !!imageDetails?.id,
  });

  useEffect(() => {
    setAnnotations(imageAnnotations ?? []);
  }, [imageAnnotations]);

  image.src = imageDetails?.url ?? "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseDown = (event: any) => {
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          color: color,
          coordinates: {
            height: 0,
            width: 0,
            x,
            y,
          },
        },
      ]);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseMove = (event: any) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].coordinates.x;
      const sy = newAnnotation[0].coordinates.y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          color: color,
          coordinates: {
            x: sx,
            y: sy,
            width: x - sx,
            height: y - sy,
          },
        },
      ]);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseUp = (event: any) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].coordinates.x;
      const sy = newAnnotation[0].coordinates.y;
      const { x, y } = event.target.getStage().getPointerPosition();

      setAnnotationToAdd({
        color: color,
        coordinates: {
          width: x - sx,
          height: y - sy,
          x: sx,
          y: sy,
        },
      });

      setNewAnnotation([]);
    }
  };

  const { mutate, isPending } = useMutation({
    ...createAnnotationMutation(),
    onSuccess: (res) => {
      setAnnotations([...annotations, res]);
      setAnnotationToAdd(undefined);
      queryClient.invalidateQueries({ queryKey: ["annotations"] });
    },
  });

  const onSaveAnnotation = () => {
    const { ...rest } = annotationToAdd;
    if (imageDetails?.id)
      mutate({
        body: {
          ...rest,
          imageId: imageDetails?.id,
          color,
          type: "rectangle",
        },
      });
  };

  const onDiscardAnnotation = () => {
    setAnnotationToAdd(undefined);
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];

  const xsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const smScreen = useMediaQuery(theme.breakpoints.down("md"));
  const mdScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const lgScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const xlScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const getStageDimensions = () => {
    let width = 0;
    let height = 0;
    if (xlScreen) {
      width = 1050;
      height = 700;
    }
    if (lgScreen) {
      width = 800;
      height = 500;
    }
    if (mdScreen) {
      width = 800;
      height = 500;
    }
    if (smScreen) {
      width = 500;
      height = 300;
    }
    if (xsScreen) {
      width = 300;
      height = 200;
    }
    return { width, height };
  };
  const { width, height } = getStageDimensions();
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, lg: 9 }}>
        <Stage
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown} // for mobile screes
          onTouchEnd={handleMouseUp} //  for mobile screes
          onTouchMove={handleMouseMove} //  for mobile screes
          width={width}
          height={height}
        >
          <Layer>
            <Image image={image} width={width} height={height} alt="image" />
            {annotationsToDraw.map((value, index) => {
              return (
                <Rect
                  key={index}
                  x={value.coordinates.x}
                  y={value.coordinates.y}
                  width={value.coordinates.width}
                  height={value.coordinates.height}
                  fill="transparent"
                  stroke={value.color}
                  strokeWidth={visible === value.id ? 6 : 2}
                />
              );
            })}
            {annotationToAdd && (
              <Rect
                x={annotationToAdd.coordinates.x}
                y={annotationToAdd.coordinates.y}
                width={annotationToAdd.coordinates.width}
                height={annotationToAdd.coordinates.height}
                fill="transparent"
                stroke={color}
                strokeWidth={2}
              />
            )}
          </Layer>
        </Stage>
      </Grid>
      <Grid size={{ xs: 12, lg: 3 }}>
        <Stack gap={2}>
          <Card sx={{ p: 2, borderRadius: "12px" }}>
            <Typography variant="subtitle1">Image details</Typography>
            <Box mt={1}>
              <Stack mb={"4px"} direction={"row"}>
                <Typography minWidth={90} fontWeight={500} variant="body1">
                  Name:
                </Typography>
                <Typography variant="body1">{imageDetails?.name}</Typography>
              </Stack>
              <Stack mb={"4px"} direction={"row"}>
                <Typography minWidth={90} fontWeight={500} variant="body1">
                  Size:
                </Typography>
                <Typography variant="body1">
                  {imageDetails?.metadata.size}
                </Typography>
              </Stack>
              <Stack direction={"row"}>
                <Typography minWidth={90} fontWeight={500} variant="body1">
                  Upload date:
                </Typography>
                <Typography variant="body1">
                  {dayjs(imageDetails?.uploadDate).format(DATE_FORMAT)}
                </Typography>
              </Stack>
            </Box>
          </Card>
          {annotationToAdd && (
            <Card sx={{ p: 2, borderRadius: "12px" }}>
              <Typography variant="subtitle1">Add Annotations</Typography>
              <Box mt={1}>
                <Typography>
                  {(annotationToAdd.coordinates?.width < 0
                    ? annotationToAdd.coordinates?.width * -1
                    : annotationToAdd.coordinates?.width
                  ).toFixed() +
                    "x" +
                    (annotationToAdd.coordinates?.height < 0
                      ? annotationToAdd.coordinates?.height * -1
                      : annotationToAdd.coordinates?.height
                    ).toFixed()}
                </Typography>
                <TextField
                  label={"Color"}
                  variant="standard"
                  sx={{ minWidth: 300, mt: 2 }}
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <Stack mt={2} direction={"row"} gap={2}>
                  <Button
                    loading={isPending}
                    onClick={onSaveAnnotation}
                    sx={{ width: "30%" }}
                    variant="contained"
                  >
                    Save
                  </Button>
                  <Button
                    sx={{ width: "30%" }}
                    variant="outlined"
                    color="error"
                    onClick={onDiscardAnnotation}
                  >
                    discard
                  </Button>
                </Stack>
              </Box>
            </Card>
          )}
          <Card sx={{ p: 2, borderRadius: "12px" }}>
            <Typography variant="subtitle1">Annotations</Typography>
            <Box mt={1}>
              {annotations?.map((a, index) => (
                <Stack
                  alignItems={"center"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  key={index}
                >
                  <Stack alignItems={"center"} direction={"row"} gap={1}>
                    <Box
                      bgcolor={a.color}
                      height={15}
                      width={15}
                      borderRadius={15}
                    ></Box>
                    <Typography minWidth={60}>
                      {(a.coordinates?.width < 0
                        ? a.coordinates?.width * -1
                        : a.coordinates?.width
                      ).toFixed() +
                        "x" +
                        (a.coordinates?.height < 0
                          ? a.coordinates?.height * -1
                          : a.coordinates?.height
                        ).toFixed()}
                    </Typography>
                  </Stack>
                  <Stack alignItems={"center"} direction={"row"} gap={1}>
                    <IconButton
                      onClick={() => setVisible(visible ? undefined : a.id)}
                    >
                      {visible === a.id ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                    <DeleteConfirmationModal
                      id={a.id ?? -1}
                      title={"Delete Annotation"}
                      itemName={""}
                      mutationFunction={deleteAnnotationMutation}
                      listQueryKey={"annotations"}
                      actionColor="error"
                    />
                  </Stack>
                </Stack>
              ))}
            </Box>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default DrawImageAnnotations;

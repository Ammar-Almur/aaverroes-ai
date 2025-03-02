'use client'
import { useEffect, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {
  Box,
  CircularProgress,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { FileType } from "@/src/services/images";

const dummyFileData: FileType = {
  name: "Office Work",
  url: "https://picsum.photos/800/600?random=2",
  uploadDate: "2024-10-22T12:00:00Z",
  metadata: {
    size: "3MB",
    resolution: "1920x1080",
  },
};

const acceptFiles = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
  "image/webp": [".webp"],
};
export const FileInput = ({
  onComplete,
  onRemove,
  label,
  error,
  errorMessage,
  initialFile = null,
  reset = false,
}: {
  onRemove?: () => void;
  onComplete: (file: FileType) => void;
  label: string;
  error?: boolean;
  errorMessage?: string;
  initialFile?: {
    fileName: string;
    downloadUrl: string;
  } | null;
  reset?: boolean;
}) => {
  const [fileName, setFileName] = useState("");

  const loading = 0;

  const [file, setFile] = useState<File | null>();
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted(files) {
      const file = files[0];
      setFileName(file.name);
      setFile(file);
      onComplete(dummyFileData);
    },

    accept: acceptFiles,
  });

  useEffect(() => {
    if (reset) {
      setFile(null);
    }
  }, [reset]);

  return (
    <Stack>
      <Typography variant="caption">{label}</Typography>
      <Box
        sx={{
          border: "1px dashed #6F6F6F",
          width: "100%",
          borderRadius: "8px",
          bgcolor: "white",
          minHeight: 60,
          height: 60,
          overflow: "hidden",
          ...(error && {
            borderColor: "error.main",
          }),
        }}
      >
        {!file && initialFile && loading === 0 && (
          <Stack
            direction="row"
            alignItems="center"
            sx={{ width: "100%", height: "100%" }}
          >
            <Box
              sx={{
                bgcolor: "#F6F6F6",
                width: "70px",
                height: "100%",
                display: "grid",
                placeItems: "center",
              }}
            >
              {loading > 0 ? (
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress variant="determinate" value={loading} />

                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >
                      {loading ?? 0}%
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <FilePresentOutlinedIcon />
              )}
            </Box>
            <Box sx={{ height: "100%", px: 2, py: 2 }}>
              <a href={initialFile?.downloadUrl} target="_blank">
                <Typography variant="body1">{initialFile?.fileName}</Typography>
              </a>
            </Box>
            {loading === 0 && (
              <IconButton
                sx={{ marginInlineStart: "auto", marginInlineEnd: 2 }}
                onClick={() => {
                  onRemove?.();
                }}
              >
                <CloseOutlinedIcon />
              </IconButton>
            )}
          </Stack>
        )}
        {(file || loading > 0) && (
          <Stack
            direction="row"
            alignItems="center"
            sx={{ width: "100%", height: "100%" }}
          >
            <Box
              sx={{
                bgcolor: "#F6F6F6",
                width: "70px",
                height: "100%",
                display: "grid",
                placeItems: "center",
              }}
            >
              {loading > 0 ? (
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress variant="determinate" value={loading} />

                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >
                      {loading ?? 0}%
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <FilePresentOutlinedIcon />
              )}
            </Box>

            <Typography mx={2} variant="body1">
              {fileName}
            </Typography>

            {loading === 0 && (
              <IconButton
                sx={{ marginInlineStart: "auto", marginInlineEnd: 2 }}
                onClick={() => {
                  setFile(null);
                  onRemove?.();
                }}
              >
                <CloseOutlinedIcon />
              </IconButton>
            )}
          </Stack>
        )}
        {!file && !initialFile && loading === 0 && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            height={"100%"}
            gap={2}
            sx={{
              py: 2,
              px: 4,
              cursor: "pointer",
            }}
            {...getRootProps()}
          >
            <>
              <FileUploadOutlinedIcon color={error ? "error" : "inherit"} />
              <Typography
                variant="body1"
                color={error ? "error" : "black"}
                sx={{ textTransform: "initial", display: "inline" }}
              >
                Browse item here
              </Typography>
            </>

            <input {...getInputProps()} />
          </Stack>
        )}
      </Box>
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </Stack>
  );
};

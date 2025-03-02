
import React, { CSSProperties, useEffect, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { useQuery } from "@tanstack/react-query";
import { getImagesQuery } from "@/src/services/images";
import { useSearchParams } from "next/navigation";


import { ImageCard } from "../image-card";
const ImageGallery = () => {
  const [columnCount, setColumnCount] = useState(4);
  const [gridWidth, setGridWidth] = useState(1500);
  const searchParams = useSearchParams();

  const getAllParams = () => {
    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  const allParams = getAllParams();

  const { data } = useQuery({ ...getImagesQuery({ filters: allParams }) });

  const updateDimensions = () => {
    const width = window.innerWidth;
    const newColumnCount = Math.floor((width - 120) / 280); // 200px is the width of each column
    setColumnCount(newColumnCount);
    setGridWidth(width - 120); // Set the grid width to the current window width
  };

  useEffect(() => {
    updateDimensions(); // Set initial dimensions
    window.addEventListener("resize", updateDimensions); // Update dimensions on resize
    return () => window.removeEventListener("resize", updateDimensions); // Clean up event listener
  }, []);

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: CSSProperties;
  }) => {
    return (
      <div style={style}>
        {data && data[rowIndex * columnCount + columnIndex] && (
          <ImageCard image={data[rowIndex * columnCount + columnIndex]} />
        )}
      </div>
    );
  };

  return (
    <Grid
      columnCount={columnCount}
      columnWidth={280}
      height={630}
      rowCount={Math.ceil((data?.length ?? 0) / columnCount)} // Calculate the number of rows
      rowHeight={210}
      width={gridWidth}
    >
      {Cell}
    </Grid>
  );
};

export default ImageGallery;

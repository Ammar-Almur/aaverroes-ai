import {
  CategoryType,
  deleteCategoryMutation,
} from "@/src/services/categories";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CategoryFormModal } from "../category-form-modal";
import { DeleteConfirmationModal } from "../../common/delete-confirmation-modal";

const ITEM_HEIGHT = 48;

interface CategoryCardProps {
  category: CategoryType;
}
function CategoryCard({ category }: CategoryCardProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card>
      <CardMedia
        component="img"
        height="194"
        image={category.image}
        alt={category.name}
      />
      <CardContent>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box>
            <Typography variant="subtitle1">{category.name}</Typography>
            <Typography
              mt={"4px"}
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              {category.description}
            </Typography>
          </Box>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              },
            }}
          >
            <CategoryFormModal type="update" categoryId={category?.id} />
            <DeleteConfirmationModal
              menuAction
              id={category.id}
              title={"Delete Category"}
              itemName={category.name}
              mutationFunction={deleteCategoryMutation}
              listQueryKey={"categories"}
              actionColor={"error"}
            />
          </Menu>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;

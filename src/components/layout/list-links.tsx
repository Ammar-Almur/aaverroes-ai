import { ROUTES } from "@/src/data";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import CategoryIcon from '@mui/icons-material/Category';
export const listLinks = [
  {
    title: ROUTES.root.title,
    href: ROUTES.root.path,
    icon: <CropOriginalIcon />,
  },
  {
    title: ROUTES.categories.title,
    href: ROUTES.categories.path,
    icon: <CategoryIcon />,
  },
];

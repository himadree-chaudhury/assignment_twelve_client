import * as React from "react";
import { createTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupIcon from "@mui/icons-material/Group";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from "@toolpad/core/Account";
import Grid from "@mui/material/Grid";
import Title from "../components/Shared/Utilities/Title";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main Routes",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Edit Biodata",
    icon: <EditDocumentIcon />,
  },
  {
    segment: "dashboard",
    title: "View Biodata",
    icon: <VisibilityIcon />,
  },
  {
    segment: "orders",
    title: "My Contact Request",
    icon: <AddIcCallIcon />,
  },
  {
    segment: "dashboard",
    title: "My Favourite Biodata",
    icon: <BookmarkAddIcon />,
  },
  {
    segment: "orders",
    title: "Got Married",
    icon: <FavoriteIcon />,
  },
  {
    segment: "dashboard",
    title: "Manage Users",
    icon: <GroupIcon />,
  },
  {
    segment: "dashboard",
    title: "Approved Premium",
    icon: <WorkspacePremiumIcon />,
  },
  {
    segment: "orders",
    title: "Approved Contact Request",
    icon: <MonetizationOnIcon />,
  },
  {
    segment: "orders",
    title: "Success Story",
    icon: <AutoStoriesIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Default",
  },
  {
    segment: "integrations",
    title: "Return To Home",
    icon: <HomeIcon />,
  },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          appTitle: Title,
        }}
      >
        <PageContainer>
          <Grid container spacing={1}>
            <Grid size={5} />
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={4}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={8}>
              <Skeleton height={100} />
            </Grid>

            <Grid size={12}>
              <Skeleton height={150} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>

            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

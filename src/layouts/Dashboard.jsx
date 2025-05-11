import * as React from "react";
import { createTheme } from "@mui/material/styles";
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
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Account } from "@toolpad/core/Account";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Stack, Typography } from "@mui/material";

// Base navigation items
const BASE_NAVIGATION = [
  {
    kind: "header",
    title: "Main Routes",
  },
  {
    segment: "statistics",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "edit-biodata",
    title: "Edit Biodata",
    icon: <EditDocumentIcon />,
  },
  {
    segment: "view-biodata",
    title: "View Biodata",
    icon: <VisibilityIcon />,
  },
  {
    segment: "contact-request",
    title: "My Contact Request",
    icon: <AddIcCallIcon />,
  },
  {
    segment: "favourite-biodata",
    title: "My Favourite Biodata",
    icon: <BookmarkAddIcon />,
  },
  {
    segment: "got-married",
    title: "Got Married",
    icon: <FavoriteIcon />,
  },
  {
    segment: "manage-users",
    title: "Manage Users",
    icon: <GroupIcon />,
  },
  {
    segment: "approved-premium",
    title: "Approved Premium",
    icon: <WorkspacePremiumIcon />,
  },
  {
    segment: "approved-contact-request",
    title: "Approved Contact Request",
    icon: <MonetizationOnIcon />,
  },
  {
    segment: "success-story",
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
    segment: "profile",
    title: "Profile",
    icon: <PersonIcon />,
  },
  {
    segment: "home",
    title: "Return To Home",
    icon: <HomeIcon />,
  },
  {
    kind: "divider",
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

const Dashboard = () => {
  const { dbUser: client, logOut } = useAuth();
  const [session, setSession] = React.useState(null);
  const navigate = useNavigate();

  // Set user to session & clear on logout
  const authentication = React.useMemo(() => {
    setSession({
      user: {
        name: client?.displayName,
        email: client?.email,
        image: client?.photoURL,
        isAdmin: client?.isAdmin,
      },
    });
    return {
      signOut: () => {
        setSession(null);
      },
    };
  }, [client]);

  // Handle logout
  const handleSignOut = async () => {
    await logOut();
    navigate("/login");
    toast.success("Logout Successful");
  };

  // Filter navigation based on user role
  const navigation = React.useMemo(() => {
    const userNavSegments = [
      "statistics",
      "edit-biodata",
      "view-biodata",
      "contact-request",
      "favourite-biodata",
      "got-married",
      // admin routes
      "statistics",
      "manage-users",
      "approved-premium",
      "approved-contact-request",
      "success-story",
    ];
    const adminNavSegments = [
      "statistics",
      "manage-users",
      "approved-premium",
      "approved-contact-request",
      "success-story",
    ];

    return BASE_NAVIGATION.filter((item) => {
      if (item.kind) return true; // Keep headers and dividers
      if (item.segment === "home") return true; // Keep "Return To Home"
      if (item.segment === "profile") return true; // Keep "Return To Home"
      return session?.user?.isAdmin
        ? adminNavSegments.includes(item.segment)
        : userNavSegments.includes(item.segment);
    });
  }, [session]);

  // Routing control
  const router = React.useMemo(() => {
    return {
      navigate: (path) => {
        if (path === "/home") {
          navigate("/");
        } else {
          navigate(`/dashboard${path}`);
        }
      },
    };
  }, [navigate]);

  function CustomAppTitle() {
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4" className="title-style">
          Pathway
        </Typography>
      </Stack>
    );
  }

  return (
    <AppProvider
      navigation={navigation}
      router={router}
      theme={demoTheme}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          sidebarFooter: () => (
            <Account
              slotProps={{
                signOutButton: {
                  color: "success",
                  startIcon: <Logout />,
                  onClick: handleSignOut,
                },
                preview: {
                  variant: "expanded",
                  slotProps: {
                    avatarIconButton: {
                      sx: {
                        width: "fit-content",
                        margin: "auto",
                      },
                    },
                    avatar: {
                      variant: "rounded",
                    },
                  },
                },
              }}
            />
          ),
        }}
      >
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Dashboard;

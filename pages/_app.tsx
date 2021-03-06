import "../styles/globals.css";
import "tippy.js/dist/tippy.css"; // optional
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import type { AppProps } from "next/app";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavbarStore } from "../stores/navbar";
import { useRouter } from "next/router";
import Image from "next/image";
import { ApolloProvider, gql } from "@apollo/client";
import { client } from "../libraries/apollo";
import { useUserStore } from "../stores/user";
import { useAuthStore } from "../stores/auth";
import { User } from "../type";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

const pages = [
  {
    title: "Home",
    href: "/home/",
  },
  {
    title: "Trending",
    href: "/home/trending",
  },
  {
    title: "Recomendation",
    href: "/home/recomendation",
  },
  {
    title: "Your Library",
    href: "/home/library",
  },
];

const pagesUnauthenticated = [
  {
    title: "Login",
    href: "/login/",
  },
  {
    title: "Register",
    href: "/register",
  },
];



const RENDER_EXCEPT = ["/login", "/register"];

function MyApp({ Component, pageProps }: AppProps) {
  const { user, setUser } = useUserStore();
  const { token, setToken } = useAuthStore()
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { show, setTransparent, transparent } = useNavbarStore();


  const settings = [{
    name: "Logout",
    handler: () => {

      setToken("");
      setUser(null);

    }
  }];

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);

    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, []);

  useEffect(() => {
    if (token) {
      client.query<{ me: User }>({
        query: gql`
        query GetMe {
  me {
    id
    username
    email
    plan
  }
}
`
      }).then(({ data }) => {
        if (data.me) {
          setUser(data.me)
        }
      })
    }
  }, [token])

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;

    setTransparent(scrolled < 0.1);
  };

  const { push, pathname } = useRouter();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: "black", minHeight: "100vh" }}>
          {!RENDER_EXCEPT.includes(pathname) && show && (
            <AppBar
              position="fixed"
              sx={{
                background: transparent ? "transparent" : undefined,
              }}
              elevation={0}
            >
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <IconButton onClick={() => push("/")}>
                    <Image src="/applogo.png" width={100} height={50} />
                  </IconButton>
                  <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                    ></IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: "block", md: "none" },
                      }}
                    >
                      {(user ? pages : pagesUnauthenticated).map((page) => (
                        <MenuItem key={page.href} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">{page.title}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                  <IconButton onClick={() => push("/")}>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                      LOGO
                    </Typography>
                  </IconButton>
                  <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    {(user ? pages : pagesUnauthenticated).map((page) => (
                      <Button
                        key={page.href}
                        onClick={() => {
                          handleCloseNavMenu();
                          push(page.href);
                        }}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page.title}
                      </Button>
                    ))}
                  </Box>

                  <Box sx={{ flexGrow: 0 }}>
                    {user && <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={user.username}
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>}
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting.name} onClick={setting.handler}>
                          <Typography textAlign="center">{setting.name}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
          )}
          <Component {...pageProps} />
        </Box>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;

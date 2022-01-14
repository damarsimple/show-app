import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Grid,
  Typography,
  createTheme,
  CssBaseline,
  Paper,
  Box,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
} from "@mui/material";
import { Copyright } from "../components/Copyright";
import Image from "next/image";
import { gql, useMutation } from "@apollo/client";
import { Auth } from "../type";
import { useUserStore } from "../stores/user";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "next/router";
const theme = createTheme();

export default function SignInSide() {
  const { setUser } = useUserStore();
  const { setToken } = useAuthStore();
  const { push } = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    handleLogin({
      variables: {
        username: data.get("email"),
        password: data.get("password"),
      }
    }).then(({ data }) => {
      if (!data) return;
      const { login } = data;

      if (login.status) {
        setUser(login.user);
        setToken(login.token ?? "");
        push("/home")
      } else {
        alert(login.message);
      }

    })
  };

  const [handleLogin] = useMutation<{ login: Auth }>(gql`
  mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    status
    message
    user {
      id
      username
      email
      plan
    }
  }
}
  `)

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(/appbanner.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src="/applogo.png" width={200} height={70} />

          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

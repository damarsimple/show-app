import { gql, useMutation, useQuery } from "@apollo/client";
import { Add, PlusOne, Star } from "@mui/icons-material";
import {
  Grid,
  Typography,
  createTheme,
  CssBaseline,
  Paper,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Stepper,
  Step,
  StepLabel,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  GlobalStyles,
  Toolbar,
  Chip,
} from "@mui/material";
import { useRouter } from "next/router";
import { FormEvent, useState, Fragment } from "react";
import { Copyright } from "../components/Copyright";
import { useAuthStore } from "../stores/auth";
import { useUserStore } from "../stores/user";
import { Auth, Genre } from "../type";

const steps = ["Account Information", "Subscription", "Customization"];

export default function SignInSide() {
  const { setUser } = useUserStore();
  const { setToken } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [errorInput, setErrorInput] = useState<string[]>([]);
  const { data: { genres } = {} } = useQuery<{
    genres: Genre[]
  }>(gql`
  query Genres {
  genres {
    id
    name
  }
}
  `);

  console.log(genres);

  const [handleRegister, { loading }] = useMutation<{ register: Auth }>(gql`
  mutation Mutation($username: String!, $email: String!, $password: String!, $plan: PLAN!, $genres: [Int]!) {
  register(username: $username, email: $email, password: $password, plan: $plan, genres: $genres) {
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

  const [data, setData] = useState<Record<string, string>>({})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setErrorMessage("");
    setErrorInput([]);
    const fills = ["username", "email", "password"];
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const submitted: Record<string, string> = {};
    const errors = [];
    for (const x of fills) {
      const value = data.get(x);

      if (!value) {
        errors.push(x);
      }

      submitted[x] = `${value}`;
    }

    if (errors.length > 0) {
      setErrorMessage(`${errors.join(", ")} is required`);
      setErrorInput(errors);
      return;
    }

    setData(submitted);
    next();
  };

  const { push } = useRouter();
  const next = () => {
    if (steps.length - 1 == activeStep) {

      handleRegister({
        variables: {
          ...data,
          genres: selectedGenres.map(x => x.id),
          plan: selectedPlan
        }
      }).then(({ data }) => {

        if (!data) return;

        const { register } = data;

        if (register.status) {
          setUser(register.user);
          setToken(register.token ?? "");
          push("/home");
        } else {
          setErrorMessage(register.message);
        }


      })

      return;
    }

    setActiveStep(activeStep + 1);
  };

  const [activeStep, setActiveStep] = useState(0);

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={8}
        md={5}
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
      <Grid item xs={12} sm={4} md={7} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Fragment>
              {activeStep == 0 && (
                <Box
                  display="flex"
                  gap={1}
                  mt={3}
                  flexDirection="column"
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <TextField
                    error={errorInput.includes("username")}
                    name="username"
                    required
                    label="Username"
                    fullWidth
                  />
                  <TextField
                    error={errorInput.includes("email")}
                    name="email"
                    required
                    label="Email"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    error={errorInput.includes("password")}
                    name="password"
                    required
                    label="Password"
                    type="password"
                    fullWidth
                  />
                  {errorMessage && (
                    <Typography color="error" textAlign="center">
                      {errorMessage}
                    </Typography>
                  )}
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              )}
              {activeStep == 1 && (
                <Grid container spacing={5} alignItems="flex-end" mt={4}>
                  <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                      Select Your Plan
                    </Typography>
                  </Grid>
                  {tiers.map((tier) => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid
                      item
                      key={tier.title}
                      xs={12}
                      sm={tier.title === "Enterprise" ? 12 : 6}
                      md={4}
                    >
                      <Card>
                        <CardHeader
                          title={tier.title}
                          subheader={tier.subheader}
                          titleTypographyProps={{ align: "center" }}
                          action={tier.title === "Pro" ? <Star /> : null}
                          subheaderTypographyProps={{
                            align: "center",
                          }}
                          sx={{
                            backgroundColor: (theme) =>
                              theme.palette.mode === "light"
                                ? theme.palette.grey[200]
                                : theme.palette.grey[700],
                          }}
                        />
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "baseline",
                              mb: 2,
                            }}
                          >
                            <Typography
                              component="h2"
                              variant="h5"
                              color="text.primary"
                            >
                              Rp. {tier.price}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                              /month
                            </Typography>
                          </Box>
                          <ul>
                            {tier.description.map((line) => (
                              <Typography
                                component="li"
                                variant="subtitle1"
                                align="center"
                                key={line}
                              >
                                {line}
                              </Typography>
                            ))}
                          </ul>
                        </CardContent>
                        <CardActions>
                          <Button
                            fullWidth
                            variant={
                              tier.buttonVariant as "outlined" | "contained"
                            }
                            onClick={() => {
                              setSelectedPlan(tier.title);
                              next();
                            }}
                          >
                            {"CHOOSE THIS PLAN"}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
              {activeStep == 2 && (
                <Box
                  sx={{
                    p: 5,
                    display: "flex",
                    gap: 3,
                    flexDirection: "column",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Select Your favorite genre
                  </Typography>
                  <TextField label="Search Genres" variant="standard" />
                  <Box>
                    {genres?.filter((e) => !selectedGenres.includes(e)).map(e => (
                      <Chip
                        key={e.id}
                        variant="outlined"
                        label={e.name}
                        onDelete={() => {
                          setSelectedGenres([e, ...selectedGenres])
                        }}
                        deleteIcon={<Add />}
                      />
                    ))}

                  </Box>
                  <Typography component="h1" variant="h5">
                    Your favorite genre
                  </Typography>
                  <TextField label="Search Genres" variant="standard" />
                  <Box>
                    {selectedGenres?.map(e => (
                      <Chip
                        key={e.id}
                        variant="outlined"
                        label={e.name}
                        onDelete={() => {
                          setSelectedGenres(selectedGenres.filter(e => e !== e))
                        }}
                        deleteIcon={<Add />}
                      />
                    ))}

                  </Box>
                  <Button variant="contained" onClick={next} disabled={loading}>
                    FINISH
                  </Button>
                </Box>
              )}
            </Fragment>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
}

const tiers = [
  {
    title: "Free",
    price: "0",
    subheader: "Poor's man choice",
    description: ["480p Video Quality", "Web", "Ads"],
    buttonVariant: "outlined",
  },
  {
    title: "Economy",
    subheader: "Most Popular",
    price: "15.000",
    description: ["720p HD Video Quality", "Web, Phone and TVs", "No Ads"],
    buttonVariant: "contained",
  },
  {
    title: "Premium",
    subheader: "King of the Internet",
    price: "30.000",
    description: ["4K HDR Video Quality", "Web, Phone and TVs", "No Ads"],
    buttonVariant: "outlined",
  },
];
const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

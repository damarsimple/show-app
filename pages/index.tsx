import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import React, { useState } from "react";
import { motion } from "framer-motion";

import Image from "next/image";

export default function Index() {
  const [showImage, setShowImage] = useState(true);
  return (
    <motion.div
      animate={{ backgroundColor: ["#ffffff", "rgba(0,0,0,0)"] }}
      transition={{
        duration: 3,
      }}
      onAnimationComplete={() => {
        setShowImage(false);
      }}
    >
      {!showImage && (
        <>
          <Grid container spacing={3} height="100vh">
            <Grid item xs={6}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
                gap={3}
                px={10}
                height="100%"
              >
                <Typography variant="h3" component="h1">
                  Unlimited movies, TV shows, and more.
                </Typography>
                <Typography variant="body1" component="p">
                  Watch anywhere. Cancel anytime.
                </Typography>
                <Typography variant="body2" component="p">
                  Ready to watch? Enter your email to get started.
                </Typography>
                <Box>
                  <TextField label="Email" variant="standard" fullWidth />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    Sign up
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
                gap={3}
                px={10}
                height="100%"
              >
                <Image src="/main-page-ads.png" width={1024} height={576} />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
                gap={3}
                px={10}
                height="100%"
              >
                <Image src="/main-page-ads.png" width={1024} height={576} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
                gap={3}
                px={10}
                height="100%"
              >
                <Typography variant="h3" component="h1">
                  Some cool marketing words ...
                </Typography>
                <Typography variant="body1" component="p">
                  Lorem ipsum dolor sit amet, consectetur adipisicing.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
                gap={3}
                px={10}
                height="100%"
              >
                <Typography variant="h3" component="h1">
                  please buy our subscriptions
                </Typography>
                <Typography variant="body1" component="p">
                  My family starving
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
                gap={3}
                px={10}
                height="100%"
              >
                <Image src="/main-page-ads.png" width={1024} height={576} />
              </Box>
            </Grid>
          </Grid>
        </>
      )}
      <Zoom in={showImage}>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src="/applogo-hd.png" width={1024} height={768} />
        </Box>
      </Zoom>
    </motion.div>
  );
}

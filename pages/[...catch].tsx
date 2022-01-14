import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import Image from "next/image";
import { PlaylistAdd } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import ShowBox from "../components/ShowBox";
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";
import { useRouter } from "next/router";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function Index() {
  const [modalOpened, setModalOpened] = useState(false);
  const { push } = useRouter();
  return (
    <Box>
      <Modal open={modalOpened} onClose={() => setModalOpened(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <video
            src="/trailer.mp4"
            autoPlay
            style={{
              width: "100%",
            }}
          />

          <Box
            sx={{
              p: 4,
              display: "flex",
              gap: 2,
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" component="h1">
              Spider no way home
            </Typography>

            <Typography variant="body2" component="p">
              Spanning the years 1945 to 1955, a chronicle of the fictional
              Italian-American Corleone crime family. When organized crime
              family patriarch, Vito Corleone barely survives an attempt on his
              life, his youngest son, Michael steps in to take care of the
              would-be killers, launching a campaign of bloody revenge.
            </Typography>

            <Divider />

            <Box display={"flex"} gap={2} alignItems={"center"}>
              <Chip label="Action" variant="outlined" />
            </Box>

            <Divider />

            <Button
              startIcon={<PlayArrowIcon />}
              color="error"
              variant="contained"
              size="large"
              onClick={() => push("/show/1")}
            >
              Watch now
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box
        sx={{
          height: "90vh",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 90%), linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('./appbanner.jpg')",
          backgroundSize: "cover",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            gap: 4,
            padding: 10,
          }}
        >
          <Typography variant="h3" component="h1">
            Spider Man No Way Home
          </Typography>
          <Box display="flex" gap={3}>
            <Button
              onClick={() => push("/show/1")}
              startIcon={<PlayArrowIcon />}
              color="error"
              variant="contained"
              size="large"
            >
              Play
            </Button>
            <Button
              startIcon={<InfoIcon />}
              onClick={() => setModalOpened(true)}
              color="secondary"
              variant="contained"
              size="large"
            >
              Info
            </Button>
          </Box>
          <Typography variant="body1" component="p">
            With Spider-Mans identity now revealed, our friendly neighborhood
            web-slinger is unmasked and no longer able to separate his normal
            life as Peter Parker from the high stakes of being a superhero.
          </Typography>
        </Box>
      </Box>

      {["TRENDING RIGHT NOW", "ORIGINAL", "COOL ACTION"].map((e, x) => (
        <Box sx={{ padding: 4 }} key={e}>
          <Box display="flex" justifyContent={"space-between"} mb={4}>
            <Typography variant="h4" component="h2">
              {e}
            </Typography>
            <Typography variant="subtitle1" component="span">
              See more
            </Typography>
          </Box>
          <Box display="flex">
            <Swiper
              navigation
              pagination={{
                dynamicBullets: true,
              }}
              spaceBetween={10}
              slidesPerView={x % 2 == 0 ? 5 : 8}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {[...Array(10)].map((_, i) => (
                <SwiperSlide key={i}>
                  {x % 2 == 0 ? <ShowBox /> : <ShowBox potrait />}
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

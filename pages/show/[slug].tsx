import {
  ClosedCaption,
  Fullscreen,
  List,
  Pause,
  VolumeMute,
} from "@mui/icons-material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import {
  Box,
  IconButton,
  Stack,
  Slider,
  Typography,
  Tooltip,
} from "@mui/material";
import withRouter, { WithRouterProps } from "next/dist/client/with-router";
import React, { useRef, useState } from "react";
import ShowBox from "../../components/ShowBox";
function Slug({ router }: WithRouterProps) {
  const { slug } = router.query;
  const [showRecomendation, setShowRecomendation] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(100);
  const [onFullscreen, setOnFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={mainRef}
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <video
        onTimeUpdate={(e) => {
          if (videoRef.current) {
            setCurrentDuration(
              (videoRef.current.currentTime / videoRef.current.duration) * 100
            );
          }
        }}
        loop
        autoPlay
        ref={videoRef}
        src="/trailer.mp4"
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
      />
      {showRecomendation && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            width: 350,
            zIndex: 10,
            height: "100%",
            background: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            gap: 2,
            flexDirection: "column",
            p: 1,
          }}
        >
          <Typography variant="h4" textAlign="center">
            RECOMENDATION
          </Typography>
          <ShowBox />
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <Tooltip title="Seek">
          <Box sx={{ width: "100%" }}>
            <Slider
              value={currentDuration}
              // onChange={(_, v) => {
              //    if (videoRef.current) {
              //     const dur = ((v as number) / 100) * videoRef.current.duration;
              //     console.log(dur);
              //     setCurrentDuration(dur);
              //     videoRef.current.currentTime = dur;
              //   }
              // }}
              onChangeCommitted={(_, v) => {
                if (videoRef.current) {
                  const dur = ((v as number) / 100) * videoRef.current.duration;
                  setCurrentDuration(dur);
                  videoRef.current.currentTime = dur;
                }
              }}
            />
          </Box>
        </Tooltip>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            px: 10,
            py: 5,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <Tooltip title="Play">
                <IconButton
                  onClick={() => videoRef.current && videoRef.current.play()}
                >
                  <PlayArrow />
                </IconButton>
              </Tooltip>
              <Tooltip title="Pause">
                <IconButton
                  onClick={() => videoRef.current && videoRef.current.pause()}
                >
                  <Pause />
                </IconButton>
              </Tooltip>
            </Stack>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <Tooltip title="Volume Down">
                <IconButton>
                  <VolumeDown />
                </IconButton>
              </Tooltip>
              <Tooltip title="Volume">
                <Slider
                  aria-label="Volume"
                  sx={{
                    width: 200,
                  }}
                  value={currentVolume}
                  onChangeCommitted={(_, v) => {
                    if (videoRef.current) {
                      setCurrentVolume(v as number);
                      videoRef.current.volume = (v as number) / 100;
                    }
                  }}
                />
              </Tooltip>
              <Tooltip title="Volume Up">
                <IconButton>
                  <VolumeUp />
                </IconButton>
              </Tooltip>
              <Tooltip title="Closed Caption">
                <IconButton>
                  <ClosedCaption />
                </IconButton>
              </Tooltip>
              <Tooltip title="Recomendation">
                <IconButton>
                  <List />
                </IconButton>
              </Tooltip>
              <Tooltip title="Fullscreen">
                <IconButton
                  onClick={() => {
                    if (mainRef.current) {
                      if (onFullscreen) {
                        document.exitFullscreen();
                        setOnFullscreen(false);
                      } else {
                        mainRef.current.requestFullscreen();
                        setOnFullscreen(true);
                      }
                    }
                  }}
                >
                  <Fullscreen />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default withRouter(Slug);

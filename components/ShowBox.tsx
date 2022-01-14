import { PlayArrow, PlaylistAdd } from "@mui/icons-material";
import { Box, Chip, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Show } from "../type";


interface ShowBoxProP extends Show {
  potrait?: Boolean
}

export default function ShowBox({ name, potrait, image_potrait, image_wide }: ShowBoxProP) {
  const [onHover, setOnHover] = useState(false);
  const { push } = useRouter();
  return (
    <Box
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      sx={{
        width: !potrait ? 340 : 200,
        height: !potrait ? 200 : 340,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <Image
          src={potrait ? image_potrait : image_wide}
          layout="fill"
          className={onHover ? "darken" : undefined}
        />
        {onHover && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              zIndex: 20,
              color: "white",
              margin: 2,
            }}
          >
            <Box display="flex" gap={1} my={1}>
              <Chip label="Action" variant="outlined" />
            </Box>

            <Typography>{name}</Typography>
            <IconButton color="error" onClick={() => push("/show/1")}>
              <PlayArrow />
            </IconButton>
            <IconButton color="error">
              <PlaylistAdd />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}

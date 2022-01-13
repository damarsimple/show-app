import { Box } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <motion.div
      animate={{ backgroundColor: ["#ffffff", "rgba(0,0,0,0)"] }}
      transition={{
        duration: 1,
      }}
      onEnded={() => console.log("ended..")}
    >
      <Box
        sx={{
          height: "100vh",
        }}
      ></Box>
    </motion.div>
  );
}

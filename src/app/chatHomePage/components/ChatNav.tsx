"use client"; // Since we're using client-side features (router, state)
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Link as MUILink,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat"; // Chat icon
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./Logout";

export default function ChatNav() {
  const router = useRouter();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Left Side: Chat Icon and Title */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="chat"
          onClick={() => router.push("/chatHomePage")}
        >
          <ChatIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Chat App
        </Typography>

        {/* Right Side: Profile and Logout */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="/profile" passHref legacyBehavior>
            <MUILink
              color="inherit"
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
            >
              Profile
            </MUILink>
          </Link>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

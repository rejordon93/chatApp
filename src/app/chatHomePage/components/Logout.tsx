"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Typography, Box } from "@mui/material";
import { Logout } from "@/app/actions/logoutAction";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    setMessage(null); // Clear previous message before new attempt
    startTransition(async () => {
      try {
        const result = await Logout();
        if (result.success) {
          setMessage(result.message);
          router.push("/login");
        } else {
          setMessage(result.message || "Logout failed");
        }
      } catch (error) {
        setMessage("An unexpected error occurred during logout");
        console.error("Logout error:", error);
      }
    });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button
        variant="text" // Changed to text to match link style
        color="inherit" // Matches AppBar color like Profile
        onClick={handleLogout}
        disabled={isPending}
        sx={{
          textTransform: "none", // Removes uppercase default
          "&:hover": { textDecoration: "underline" }, // Matches Profile hover
        }}
      >
        {isPending ? "Logging Out..." : "Logout"}
      </Button>
      {message && (
        <Typography
          variant="body2"
          color={
            message.includes("failed") || message.includes("error")
              ? "error.main"
              : "success.main"
          }
          sx={{ mt: 1, textAlign: "center" }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}

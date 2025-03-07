"use client"; // Mark as a client component

import { useState, useTransition } from "react";
import { useSignUp } from "../store/userStore";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";

type SignUpPageProps = {
  formAction: (formData: FormData) => Promise<{
    errors?: {
      username?: string[];
      email?: string[];
      password?: string[];
    };
  }>;
};

export default function SignUpForm({ formAction }: SignUpPageProps) {
  const { username, email, error, setUsername, setEmail, setError } =
    useSignUp();
  const [formErrors, setFormErrors] = useState<{
    username?: string[];
    email?: string[];
    password?: string[];
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await formAction(formData);
      if (result?.errors) {
        setFormErrors(result.errors);
        setError("Sign-up failed");
      } else {
        setFormErrors(null);
        setError("");
      }
    });
  };

  console.log(useSignUp());

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", p: 3, mt: 5 }}>
      <Box
        component="form"
        action={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Sign Up
        </Typography>

        {/* Username Field */}
        <TextField
          id="username"
          name="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isPending}
          error={!!formErrors?.username}
          helperText={formErrors?.username?.[0]}
          variant="outlined"
          fullWidth
        />

        {/* Email Field */}
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
          error={!!formErrors?.email}
          helperText={formErrors?.email?.[0]}
          variant="outlined"
          fullWidth
        />

        {/* Password Field */}
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          disabled={isPending}
          error={!!formErrors?.password}
          helperText={formErrors?.password?.[0]}
          variant="outlined"
          fullWidth
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isPending}
          fullWidth
          startIcon={
            isPending ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {isPending ? "Signing Up..." : "Sign Up"}
        </Button>

        {/* General Error */}
        {error && (
          <Typography color="error" variant="body2" align="center">
            {error}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

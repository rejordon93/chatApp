// src/app/components/LoginForm.tsx
"use client";
import { useState, useTransition } from "react";
import { useSignUp } from "../store/userStore";
import { useRouter } from "next/navigation";
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Link as MUILink,
} from "@mui/material";
import Link from "next/link";

type LoginFormProps =
  | {
      errors?: { email?: string[]; password?: string[] };
      success?: undefined;
      formAction: (formData: FormData) => Promise<{
        errors?: { email?: string[]; password?: string[] };
        success?: boolean;
      }>;
    }
  | {
      success: true;
      res: { message: string; token: string; username: string; email: string };
      errors?: undefined;
      formAction: (formData: FormData) => Promise<{
        errors?: { email?: string[]; password?: string[] };
        success?: boolean;
      }>;
    };

export default function LoginForm({ formAction }: LoginFormProps) {
  const { email, error, setIsActive, setEmail, setError } = useSignUp();
  const [formErrors, setFormErrors] = useState<{
    email?: string[];
    password?: string[];
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await formAction(formData);
      if (result?.errors) {
        setFormErrors(result.errors);
        setError("Login failed");
        setIsActive(false);
      } else if (result.success) {
        setFormErrors(null);
        setError("");
        setIsActive(true);
        router.push("/chatHomePage");
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 2 }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" action={handleAction} sx={{ mt: 2 }}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            fullWidth
            margin="normal"
            error={!!formErrors?.email}
            helperText={formErrors?.email?.[0]}
            variant="outlined"
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            disabled={isPending}
            fullWidth
            margin="normal"
            error={!!formErrors?.password}
            helperText={formErrors?.password?.[0]}
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isPending}
            sx={{ mt: 2, py: 1.5 }}
          >
            {isPending ? "Logging In..." : "Login"}
          </Button>
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link href="/signUp" passHref legacyBehavior>
              <MUILink
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign Up
              </MUILink>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

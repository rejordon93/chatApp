"use client"; // Mark as a client component

import { useState, useTransition } from "react";
import { useSignUp } from "../store/userStore";

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
        setFormErrors(result.errors); // Store field-specific errors locally
        setError("Sign-up failed"); // Optional: Set a general error in Zustand
      } else {
        setFormErrors(null); // Clear local errors
        setError(""); // Clear store error on success (server redirect handles navigation)
      }
    });
  };
  console.log(useSignUp());

  return (
    <form action={handleSubmit} className="space-y-4">
      {/* Username Field */}
      <div>
        <label htmlFor="username" className="block">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
          disabled={isPending}
        />
        {formErrors?.username && (
          <p className="text-red-500 text-sm">{formErrors.username[0]}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          disabled={isPending}
        />
        {formErrors?.email && (
          <p className="text-red-500 text-sm">{formErrors.email[0]}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="border p-2 w-full"
          disabled={isPending}
        />
        {formErrors?.password && (
          <p className="text-red-500 text-sm">{formErrors.password[0]}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={isPending}
      >
        {isPending ? "Signing Up..." : "Sign Up"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}

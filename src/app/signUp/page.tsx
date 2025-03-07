// src/app/signUp/page.tsx
import React from "react";
import { signUpAction } from "@/app/actions/signUpAction";
import SignUpForm from "./signUp"; // Assuming you have this component

export default function SignUpPage() {
  return <SignUpForm formAction={signUpAction} />;
}

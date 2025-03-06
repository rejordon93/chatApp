import React from "react";
import { signUpAction } from "@/app/actions/signUpAction";
import SignUpForm from "./signUp/page"; // Adjust path as needed

export default function ChatAppHomePage() {
  return (
    <div>
      <SignUpForm formAction={signUpAction} /> {/* Corrected to formAction */}
    </div>
  );
}

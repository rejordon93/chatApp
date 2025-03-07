import React from "react";
import { signUpAction } from "@/app/actions/signUpAction";
import SignUpForm from "./signUp/page";
import { loginAction } from "./actions/loginAction"; // Adjust path as needed
import LoginForm from "./login/page";

export default function ChatAppHomePage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

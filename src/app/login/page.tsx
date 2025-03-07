// src/app/page.tsx
import React from "react";
import { loginAction } from "@/app/actions/loginAction";
import LoginForm from "./LoginForm"; // Move LoginForm here

export default function ChatAppHomePage() {
  return (
    <div>
      <LoginForm formAction={loginAction} />
    </div>
  );
}

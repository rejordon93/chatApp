"use server";
import prisma from "../database/prisma";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Invalid Password"),
});

export async function loginAction(formData: FormData) {
  const validatedLogin = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedLogin.success) {
    return {
      errors: validatedLogin.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedLogin.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { errors: { email: ["No user found with this email"] } };
  }

  const vaildPassword = await bcryptjs.compare(password, user.password);
  if (!vaildPassword) {
    return { errors: { password: ["Invalid Password"] } };
  }

  const tokenData = {
    id: user.id,
  };

  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    expiresIn: "1d",
  });

  (await cookies()).set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  redirect("/chatHomePage");
}

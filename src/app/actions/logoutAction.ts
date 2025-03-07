"use server";
import prisma from "../database/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function Logout() {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token");

  if (!tokenCookie?.value) {
    return { success: false, message: "No token found in cookies" };
  }

  // Decode the JWT token
  let decodedToken;
  try {
    decodedToken = jwt.verify(tokenCookie.value, process.env.TOKEN_SECRET!) as {
      id: string;
      email: string;
    };
  } catch (error) {
    console.log("Invalid token:", error);
    return { success: false, message: "Invalid or expired token" };
  }

  const { email } = decodedToken;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("User not found in database");
    return { success: false, message: "User not found" };
  }

  await prisma.user.update({
    where: { email },
    data: { isActive: false },
  });

  (
    await // Clear the token cookie
    cookieStore
  ).set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  console.log("User logged out:", user);
  return { success: true, message: "Logout successful" };
}

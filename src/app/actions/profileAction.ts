"use server";
import prisma from "../database/prisma";
import { z } from "zod";

const profileSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  state: z.string(),
  city: z.string(),
  country: z.string(),
  bio: z.string(),
});

export async function profileAction(formData: FormData) {
  const validatedProfile = profileSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    state: formData.get("state"),
    city: formData.get("city"),
    country: formData.get("country"),
    bio: formData.get("bio"),
  });
  if (!validatedProfile.success) {
    return {
      errors: validatedProfile.error.flatten().fieldErrors,
    };
  }
  const { username, email, state, city, country, bio } = validatedProfile.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return { errors: { email: ["No user found with this email"] } };
  }
  const updatedProfile = await prisma.profile.create({
    data: {
      username,
      email,
      state,
      city,
      country,
      bio,
      user: { connect: { email } },
    },
  });
  if (!updatedProfile) {
    return { errors: { password: ["Invalid Password"] } };
  }

  await prisma.user.update({
    where: { email },
    data: { username, email },
  });
}

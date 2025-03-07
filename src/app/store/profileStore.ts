import { create } from "zustand";
import profileAction from "../actions/profileAction";

export interface ProfileState {
  username: string;
  email: string;
  state: string;
  city: string;
  country: string;
  bio: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setState: (state: string) => void;
  setCity: (city: string) => void;
  setCountry: (country: string) => void;
  setBio: (bio: string) => void;
  profile: (formData: FormData) => Promise<{ status: string; error: any }>;
}

export const useProfile = create<ProfileState>((set) => ({
  username: "",
  email: "",
  state: "",
  city: "",
  country: "",
  bio: "",
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setState: (state) => set({ state }),
  setCity: (city) => set({ city }),
  setCountry: (country) => set({ country }),
  setBio: (bio) => set({ bio }),
  profile: async (formData: FormData) => {
    try {
      const result = await profileAction(formData);

      if (result?.errors) {
        return { status: "error", error: result.errors };
      }

      // Set the state with the submitted formData since profileAction doesn't return the data
      set({
        username: formData.get("username")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        state: formData.get("state")?.toString() || "",
        city: formData.get("city")?.toString() || "",
        country: formData.get("country")?.toString() || "",
        bio: formData.get("bio")?.toString() || "",
      });

      return { status: "success", error: null };
    } catch (error) {
      console.error("Profile update failed:", error);
      return { status: "error", error };
    }
  },
}));

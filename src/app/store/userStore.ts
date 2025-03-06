import { create } from "zustand";
import { signUpAction } from "@/app/actions/signUpAction"; // Adjust path

export interface SignUpState {
  username: string;
  email: string;
  status: "success" | "error";
  error: string | null;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setError: (error: string) => void;
  signUp: (formData?: FormData) => Promise<void>;
}

export const useSignUp = create<SignUpState>((set) => ({
  username: "",
  email: "",
  status: "success",
  error: null,
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setError: (error) => set({ error }),
  signUp: async (formData) => {
    set({ status: "success", error: null });
    try {
      const data = formData || new FormData();
      if (!formData) {
        data.append("username", useSignUp.getState().username);
        data.append("email", useSignUp.getState().email);
      }
      const result = await signUpAction(data);
      if (result?.errors) {
        set({
          status: "error",
          error:
            result.errors.email?.[0] ||
            result.errors.username?.[0] ||
            result.errors.password?.[0] ||
            "Sign-up failed",
        });
      } else {
        set({ status: "success" });
      }
    } catch (err) {
      if (err instanceof Error) {
        set({ status: "error", error: err.message || "An error occurred" });
      } else {
        set({ status: "error", error: "An error occurred" });
      }
    }
  },
}));

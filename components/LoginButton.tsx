"use client";

import { supabase } from "@/lib/supabase";

export default function LoginButton() {
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="bg-black text-white px-6 py-3 rounded-lg"
    >
      Sign in with Google
    </button>
  );
}

"use client";

import { supabase } from "@/lib/supabase";

export default function LoginButton() {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      alert(error.message);
    }
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
